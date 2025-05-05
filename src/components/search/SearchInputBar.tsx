//src/components/search/SearcchInputBar.tsx
'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import SearchViewMenu from '@/components/search/SearchViewMenu';
import { cn } from "@/utils/classes/merge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchLogic } from "@/hooks/useSearchLogic";
import { useEffect, useState } from "react";
import { useDebouncedEffect } from "@/hooks/useDebounceEffect";

export default function SearchInputBar() {

    const { inputRef, query, setQuery, handleSearch } = useSearchLogic();
    const [inputValue, setInputValue] = useState(query);

    // Keep in sync if query is reset externally
    useEffect(() => {
        setInputValue(query);
    }, [query]);

    // Debounce local input value → update store
    useDebouncedEffect(() => {
        setQuery(inputValue);
    }, [inputValue]);

    return (
        <div className="flex items-center justify-center gap-2 xs:gap-4 sm:gap-6 max-w-[1300px] w-full">
            <div
                className={cn(
                    "flex items-center w-full bg-white border-2 border-white rounded-full",
                    "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring")}
            // layoutId="searchField"
            >
                <Input
                    ref={inputRef}
                    type="search"
                    enterKeyHint="search"
                    role="search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder='Try "Cherry" or "Bourbon"'
                    className="bg-transparent md:min-w-86"
                    focus={"parent"}
                />
                <Button
                    variant={"accent"}
                    onClick={handleSearch}
                    aria-label="Search Button"
                    size={"icon"}
                    className="size-11"
                ><MagnifyingGlassIcon />
                </Button>
            </div>
            <SearchViewMenu />
        </div>
    )
}