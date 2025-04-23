// hooks/useLongPress.ts
import { useRef, useCallback } from "react";

export function useLongPress(onLongPress: () => void, delay = 500) {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
        timeout.current = setTimeout(onLongPress, delay);
    }, [onLongPress, delay]);

    const clear = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
    }, []);

    return {
        onTouchStart: start,
        onTouchEnd: clear,
        onTouchCancel: clear,
    };
}
