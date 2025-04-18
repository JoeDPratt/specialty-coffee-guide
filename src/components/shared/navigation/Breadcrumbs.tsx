import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    crumbs: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({
    crumbs,
    className = "",
}: BreadcrumbsProps) {

    return (
        <nav
            aria-label="Breadcrumb"
            className={`pt-3.25 pb-2.25`}
        >
            <ol className="flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-1 no-scrollbar">
                {crumbs.map((item, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-1">
                            {!isLast ? (
                                <>
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center hover:underline font-sofia-sans text-base font-normal"
                                    >
                                        {item.label}

                                    </Link>
                                    <ChevronRightIcon className="w-4 h-4" />
                                </>
                            ) : (
                                <span className="text-pr-500 font-sofia-sans text-base font-normal">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
