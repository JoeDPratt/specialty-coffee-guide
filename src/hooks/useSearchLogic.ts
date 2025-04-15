// hooks/useSearchLogic.ts
import { useState, useEffect, useRef } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
import { useRouter } from 'next/navigation';

export function useSearchLogic() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const toggleSearch = useSearchStore((s) => s.toggleSearch);
    const closeSearch = useSearchStore((s) => s.closeSearch);
    const filters = useSearchStore((s) => s.filters);
    const query = useSearchStore((s) => s.query);
    const setQuery = useSearchStore((s) => s.setQuery);

    const [localQuery, setLocalQuery] = useState(query);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeSearch();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeSearch]);

    const handleSearch = () => {
        setQuery(localQuery);
        closeSearch();

        const activeFilters = Object.entries(filters)
            .filter(([_, value]) => !!value)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const searchTerm = localQuery.trim() ? `q=${encodeURIComponent(localQuery)}` : '';
        const combinedQuery = [searchTerm, activeFilters].filter(Boolean).join('&');

        router.push(`/search?${combinedQuery}`);
    };

    return {
        inputRef,
        localQuery,
        setLocalQuery,
        handleSearch,
        toggleSearch,
    };
}
