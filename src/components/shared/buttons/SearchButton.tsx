import type { JSX } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

export default function SearchButton({
    className,
    onClick,
}: { className?: string; onClick?: () => void; }
): JSX.Element {

    return (
        <button
            onClick={onClick}
            className={`${className} bg-pr-500 px-2.5 hover:bg-pr-400 transition-all duration-200 cursor-pointer group`}
            aria-label={"Search Button"}
        >
            <MagnifyingGlassIcon className="w-6 h-6 text-white group-hover:animate-pulse" />
        </button>
    );
}
