//src/components/search/SearcchInputBar.tsx
'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { cn } from "@/utils/classes/merge";
import { Input } from "@/components/ui/input";
import { useSearchLogic } from "@/hooks/useSearchLogic";
import { useEffect, useState } from "react";
import { useDebouncedEffect } from "@/hooks/useDebounceEffect";
import { AnimatedPlaceholderInput } from "../shared/inputs/AnimatedPlaceholderText";

export default function SearchInput({ className }: { className?: string }) {

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
        <div
            className={cn(
                "flex items-center w-full min-w-min bg-white border-2 border-white rounded-full",
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-pr-900",
                className
            )}
        >
            <MagnifyingGlassIcon className="size-6 ml-3 text-pr-900" />
            <Input
                ref={inputRef}
                type="search"
                enterKeyHint="search"
                role="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder='Try "Cherry" or "Bourbon"'
                className="bg-transparent md:min-w-86 pl-2"
                focus={"parent"}
            />
        </div>
    )
}