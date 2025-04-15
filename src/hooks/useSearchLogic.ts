// hooks/useSearchLogic.ts
import { useState, useEffect, useRef } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
import { useRouter } from 'next/navigation';
import { serializeQueryParams } from '@/utils/navigation/serializeQueryParams';

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

        const queryObject = {
            q: localQuery.trim() || undefined,
            ...filters,
        };

        const queryString = serializeQueryParams(queryObject);
        router.push(`/search?${queryString}`);
    };

    return {
        inputRef,
        localQuery,
        setLocalQuery,
        handleSearch,
        toggleSearch,
    };
}
