// src/hooks/useDelayedUnmount.ts
import { useState, useEffect } from "react";

export function useDelayedUnmount(isMounted: boolean, delay: number = 300) {
    const [shouldRender, setShouldRender] = useState(isMounted);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isMounted) {
            // Mount immediately
            setShouldRender(true);
        } else {
            // Wait for CSS to finish
            timeout = setTimeout(() => setShouldRender(false), delay);
        }
        return () => clearTimeout(timeout);
    }, [isMounted, delay]);

    return shouldRender;
}
