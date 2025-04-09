import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid"; // or use Heroicons
import { JSX } from "react";
import { getBreadcrumbsFromPath } from "@/utils/navigation/breadcrumbs";

interface BreadcrumbsProps {
    path: string;
    finalLabel?: string;
    className?: string;
}

interface Crumb {
    label: string;
    href?: string;
}

export async function Breadcrumbs({ path, finalLabel, className = "" }: BreadcrumbsProps) {
    const crumbs = getBreadcrumbsFromPath(path, finalLabel);

    return (
        <nav aria-label="Breadcrumb" className="bg-pr-200 shadow-breadcrumbs">
            <ol className={`${className} flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-1 no-scrollbar`}>
                {crumbs.map((item, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-1">
                            {!isLast ? (
                                <>
                                    <Link href={item.href} className="hover:underline text-pr-800 font-sofia-sans text-base font-normal">
                                        {item.label}
                                    </Link>
                                    <ChevronRightIcon className="w-4 h-4 text-pr-600" />
                                </>
                            ) : (
                                <span className="text-sc-100 font-sofia-sans text-base font-normal">{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
            <hr className="text-pr-200 shadow-b-neumorphic bg-pr-200 color-pr-200 border-none w-full mx-auto h-0.5 mt-2.25" />
        </nav>
    );
}
