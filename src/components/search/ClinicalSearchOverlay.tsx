"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SearchResultRow } from "@/components/search/SearchResultRow";
import { groupClinicalResults, searchClinicalIndex } from "@/lib/search/query";
import { CLINICAL_DOMAIN_FILTERS } from "@/lib/search/types";
import type { ClinicalDomainFilter, ClinicalSearchResult } from "@/lib/search/types";

const PLACEHOLDER = "Buscar hallazgo, protocolo, ventana, clip…";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (result: ClinicalSearchResult) => void;
};

export function ClinicalSearchOverlay({ open, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<ClinicalDomainFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchClinicalIndex(query, domain), [query, domain]);
  const grouped = useMemo(() => groupClinicalResults(results), [results]);
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setDomain("all");
    setActiveIndex(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, domain]);

  const selectAt = useCallback(
    (index: number) => {
      const item = flat[index];
      if (item) onSelect(item);
    },
    [flat, onSelect]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, flat.length - 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && flat.length > 0) {
        e.preventDefault();
        selectAt(activeIndex);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, flat, activeIndex, selectAt]);

  if (!open) return null;

  let rowOffset = 0;

  return (
    <div
      className="clinical-search-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda clínica"
      onClick={onClose}
    >
      <div className="clinical-search-panel" onClick={(e) => e.stopPropagation()}>
        <header className="clinical-search-header">
          <Search size={18} className="clinical-search-input-icon" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            className="clinical-search-input"
            placeholder={PLACEHOLDER}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label={PLACEHOLDER}
          />
          {query && (
            <button type="button" className="clinical-search-clear" onClick={() => setQuery("")} aria-label="Limpiar">
              <X size={16} />
            </button>
          )}
          <button type="button" className="clinical-search-close" onClick={onClose} aria-label="Cerrar búsqueda">
            <X size={20} />
          </button>
        </header>

        <div className="clinical-search-filters" role="tablist" aria-label="Filtros rápidos">
          {CLINICAL_DOMAIN_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={domain === f.id}
              className={`clinical-search-filter${domain === f.id ? " clinical-search-filter--active" : ""}`}
              onClick={() => setDomain(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="clinical-search-count">
          {flat.length} resultado{flat.length !== 1 ? "s" : ""}
        </p>

        <div className="clinical-search-results">
          {flat.length === 0 ? (
            <p className="clinical-search-empty">Sin coincidencias. Prueba otro término o filtro.</p>
          ) : (
            grouped.map((section) => (
              <section key={section.group} className="clinical-search-group">
                <h3 className="clinical-search-group-title">{section.label}</h3>
                {section.items.map((item) => {
                  const idx = rowOffset++;
                  return (
                    <SearchResultRow
                      key={item.id}
                      result={item}
                      active={idx === activeIndex}
                      onSelect={() => onSelect(item)}
                    />
                  );
                })}
              </section>
            ))
          )}
        </div>

        <footer className="clinical-search-footer">
          <span>↑↓ navegar</span>
          <span>↵ abrir</span>
          <span>esc cerrar</span>
        </footer>
      </div>
    </div>
  );
}
