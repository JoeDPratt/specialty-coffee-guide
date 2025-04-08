import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid"; // or use Heroicons

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className: string;
}

export function Breadcrumbs({ items, className}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-pr-100">
      <ol className={`${className} flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-1 no-scrollbar`}>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {!isLast ? (
                <>
                  <Link
                    href={item.href || "#"}
                    className="hover:underline text-pr-800 font-sofia-sans text-lg font-light"
                  >
                    {item.label}
                  </Link>
                  <ChevronRightIcon className="w-4 h-4 text-pr-600" />
                </>
              ) : (
                <span className="text-sc-100 font-sofia-sans text-lg font-light">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
      <hr className="text-pr-300 shadow-b-neumorphic bg-pr-100 color-pr-300 border-none w-full mx-auto h-0.5 mb-20 mt-2"></hr>

    </nav>
  );
}
