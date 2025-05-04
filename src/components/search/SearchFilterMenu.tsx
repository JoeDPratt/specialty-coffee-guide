// src/components/search/SearchFilterMenu.tsx
import { cn } from "@/utils/classes/merge";
import { FilterRow } from "./FilterRow";

export default function SearchFilterMenu({ className }: { className: string }) {

    return (
        <div className={cn(className, "gap-8")}>
            <div>
                <h2 className="text-3xl pt-0.5 mb-5.5 leading-none">Filters</h2>
                <hr className="hr-dark mb-0.75"></hr>
            </div>
            <div>
                <h3 className="text-2xl leading-none mb-3.25">Sourcing & Quality</h3>
                <FilterRow />
                <hr className="hr-dark mt-7.5"></hr>
            </div>
            <div>
                <h3 className="text-2xl leading-none mb-3.25">Price</h3>
                {/* <FilterRow /> */}
                <hr className="hr-dark mt-7.5"></hr>
            </div>
        </div>
    )
}