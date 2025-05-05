// src/components/search/SearchFilterMenu.tsx
import { cn } from "@/utils/classes/merge";
import { AttributeFilterRow } from "@/components/search/filters/AttributeFilterRow";
import CupScoreFilter from "@/components/search/filters/CupScoreFilter";
import SourcingQualityFilter from "./filters/SourcingQualityFilter";

export default function SearchFilterMenu({ className }: { className: string }) {

    return (
        <div className={cn(className)}>
            <h2 className="text-3xl pt-0.5 leading-none mb-2">Filters</h2>
            <div className={cn("flex flex-col gap-7.5")}>

                <hr className="hr-dark"></hr>
                <SourcingQualityFilter />
                <hr className="hr-dark"></hr>
                <div>
                    <h3 className="text-2xl leading-none mt-0 mb-0">Price</h3>
                </div>
                <hr className="hr-dark"></hr>
                <CupScoreFilter />
                <hr className="hr-dark"></hr>

            </div>
        </div>
    )
}