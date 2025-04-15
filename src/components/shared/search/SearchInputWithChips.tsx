'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
    Command,
    CommandList,
    CommandItem,
    CommandEmpty,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { useSearchStore } from '@/stores/useSearchStore';
import { cn } from '@/utils/classes/merge';

const SUGGESTIONS = [
    'Red Catuai',
    'Bourbon',
    'Geisha',
    'Cherry',
    'Anaerobic',
    'Natural Process',
];

export function SearchInputWithChips({ className }: { className: string }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false); // control popover manually

    const setQuery = useSearchStore((s) => s.setQuery);

    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            const updatedTags = [...selectedTags, tag];
            setSelectedTags(updatedTags);
            setQuery(updatedTags.join(', '));
        }
        setInputValue('');
        setIsOpen(false);
    };

    const removeTag = (tag: string) => {
        const updatedTags = selectedTags.filter((t) => t !== tag);
        setSelectedTags(updatedTags);
        setQuery(updatedTags.join(', '));
    };

    const filteredSuggestions = SUGGESTIONS.filter(
        (item) =>
            item.toLowerCase().includes(inputValue.toLowerCase()) &&
            !selectedTags.includes(item)
    );

    return (
        <div className={cn(
            "relative flex flex-1 flex-col items-start justify-center",
            className)}>

            {/* Main Input triggers the popover */}
            <Input
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsOpen(true);
                }}
                placeholder='Try "Cherry" or "Bourbon"'
                className="text-lg text-pr-900 flex-1 self-start w-full placeholder:text-pr-900/70 border-none shadow-none bg-transparent"
            />

            {/* Custom Dropdown (absolutely positioned) */}
            {isOpen && inputValue && (
                <div className="absolute top-24 z-10 p-4 left-0 w-full max-w-[840px] rounded-xl border-none bg-white shadow">
                    <Command shouldFilter={false}>
                        <CommandList>
                            {filteredSuggestions.length === 0 ? (
                                <CommandEmpty>No results found.</CommandEmpty>
                            ) : (
                                filteredSuggestions.map((item) => (
                                    <CommandItem
                                        key={item}
                                        onSelect={() => addTag(item)}
                                        className="cursor-pointer text-lg"
                                    >
                                        {item}
                                    </CommandItem>
                                ))
                            )}
                        </CommandList>
                    </Command>
                </div>
            )}

            {/* Tags Display */}
            <div className={cn(
                "my-2 flex-wrap gap-2",
                selectedTags.length > 0 ? "flex" : "hidden"
            )}>
                {selectedTags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="outline"
                        className="flex items-center gap-1 pr-1 text-md rounded-full"
                    >
                        {tag}
                        <XMarkIcon
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTag(tag)}
                        />
                    </Badge>
                ))}
            </div>
        </div>
    );
}
