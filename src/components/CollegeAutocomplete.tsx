'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';

interface CollegeSuggestion {
  name: string;
  city: string;
  type: string;
  fees: number | null;
}

interface CollegeAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  index: number;
}

export function CollegeAutocomplete({
  value,
  onChange,
  placeholder = "Enter college name",
  index
}: CollegeAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<CollegeSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(
          `${API_URL}/api/colleges/autocomplete?query=${encodeURIComponent(value)}&limit=8`
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions || []);
          setIsOpen(data.suggestions.length > 0);
        }
      } catch (error) {
        console.error('Autocomplete error:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleSelect = (suggestion: CollegeSuggestion) => {
    onChange(suggestion.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const formatFees = (fees: number | null) => {
    if (!fees) return 'N/A';
    if (fees >= 100000) return `₹${(fees / 100000).toFixed(1)}L`;
    return `₹${(fees / 1000).toFixed(0)}K`;
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
          size={18} 
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-md shadow-lg max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full text-left px-4 py-3 transition-colors ${
                idx === selectedIndex
                  ? 'bg-primary/10 border-l-2 border-primary'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {suggestion.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {suggestion.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 size={12} />
                      {suggestion.type}
                    </span>
                  </div>
                </div>
                {suggestion.fees && (
                  <span className="text-sm font-semibold text-primary flex-shrink-0">
                    {formatFees(suggestion.fees)}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && value.length >= 2 && suggestions.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-md shadow-lg p-4 text-center text-sm text-muted-foreground">
          No colleges found for "{value}"
          <p className="mt-1 text-xs">Try using abbreviations like "MIT", "VJTI", or "COEP"</p>
        </div>
      )}
    </div>
  );
}

