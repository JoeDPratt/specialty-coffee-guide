import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useState } from "react";

export function Tooltip({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <TooltipPrimitive.Root open={open} onOpenChange={setOpen} delayDuration={0}>
            {children}
        </TooltipPrimitive.Root>
    );
}