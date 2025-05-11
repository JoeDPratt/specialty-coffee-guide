import { useEffect } from "react";

type ScrollTarget = "window" | React.RefObject<HTMLElement | null>;

interface Options {
    isSuccess: boolean;
    isFetching: boolean;
    target?: ScrollTarget;
    behavior?: ScrollBehavior;
}

export function useDebounceScrollTop({
    isSuccess,
    isFetching,
    target = "window",
    behavior = "smooth",
}: Options) {
    useEffect(() => {
        if (isSuccess && !isFetching) {
            const scrollOptions: ScrollToOptions = { top: 0, behavior };

            if (target === "window") {
                window.scrollTo(scrollOptions);
            } else if (target?.current) {
                target.current.scrollTo(scrollOptions);
            }
        }
    }, [isSuccess, isFetching, target, behavior]);
}
