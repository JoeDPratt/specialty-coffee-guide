import { cn } from "@/utils/classes/merge";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { FilterRow } from "./FilterRow";

export default function SearchFilters({ className }: { className: string }) {
    return (
        <div className={cn(className, "")}>
            <FilterRow />

        </div>
    )
}