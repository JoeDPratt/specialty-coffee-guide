import { cn } from "@/utils/classes/merge";
import { FilterRow } from "./FilterRow";

export default function SearchFilterMenu({ className }: { className: string }) {
    return (
        <div className={cn(className, "")}>
            <FilterRow />

        </div>
    )
}