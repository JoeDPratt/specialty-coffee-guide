'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/classes/merge'

const examples = [
    "cherry",
    "bourbon",
    "anaerobic",
    "Wogan Coffee",
    "dark"
]

export function AnimatedPlaceholderInput() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % examples.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full max-w-md">
            <Input
                type="text"
                placeholder="" // leave real placeholder empty
                className="relative z-10 bg-transparent"
            />
            {/* Animated placeholder as absolute overlay */}
            <span className={cn(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
            )}>Try </span>
            <span
                key={examples[index]} // key triggers re-animation
                className={cn(
                    "pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground",
                    "transition-all ease-in-out animate-fade-in duration-1000 "
                )}
            >
                {examples[index]}
            </span>
        </div>
    )
}
