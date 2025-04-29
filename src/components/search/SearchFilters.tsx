import { cn } from "@/utils/classes/merge";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export default function SearchFilters({ className }: { className: string }) {
    return (
        <div className={cn(className, "")}>
            <Button variant={"destructive"} styleType={"outline"} className="self-start">Filter</Button>
            <Button variant={"default"} size={"lg"} disabled className="self-start">Filter</Button>
            <Button variant={"accent"} className="self-start" iconPosition={"left"}><ChevronLeftIcon />Previous</Button>
            <Button variant={"accent"} iconPosition={"left"}><ChevronLeftIcon />Previous</Button>
            <Button variant={"accent"} className="self-start" iconPosition={"right"}>Next<ChevronRightIcon /></Button>
            <Button variant={"default"} size={"icon"}><ChevronLeftIcon /></Button>
            <Button variant={"accent"} size={"iconLg"}><ChevronLeftIcon /></Button>

        </div>
    )
}