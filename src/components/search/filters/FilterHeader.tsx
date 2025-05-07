import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface FilterHeadingProps {
    title: string;
    subtitle?: string;
    handleClear: () => void;
    isSet: boolean;
}
export default function FilterHeader({
    title,
    subtitle,
    handleClear,
    isSet
}: FilterHeadingProps) {

    return (
        <div className="-mt-0.25 mb-5.25">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl leading-none m-0 py-0.5">{title}</h3>
                {isSet && <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="h-7 px-3"
                    onClick={handleClear}>
                    Clear
                </Button>}
            </div>
            {subtitle && <p className="text-base text-pr-900 text-left leading-5 mt-2.5 mb-0">{subtitle}</p>}
        </div>
    )
}