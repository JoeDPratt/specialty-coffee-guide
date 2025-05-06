// components/ui/RangeSlider.tsx
'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/classes/merge';

export interface RangeSliderProps
    extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
}

export const RangeSlider = React.forwardRef<
    React.ComponentRef<typeof SliderPrimitive.Root>,
    RangeSliderProps
>(({ className, value, onValueChange, min, max, step, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full items-center', className)}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-card-100">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        {/* 🔥 Two thumbs here */}
        <SliderPrimitive.Thumb className="block size-7 rounded-full bg-white ring-offset-background shadow-md focus-visible:ring-2 focus-visible:ring-ring" />
        <SliderPrimitive.Thumb className="block size-7 rounded-full bg-white ring-offset-background shadow-md focus-visible:ring-2 focus-visible:ring-ring" />
    </SliderPrimitive.Root>
));

RangeSlider.displayName = SliderPrimitive.Root.displayName;
