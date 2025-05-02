import { FilterToggle } from "@/components/search/FilterToggle"
import { ScalableIcon } from "../icons/ScalableIcon"
import Decaf from "@/components/icons/icon-decaf.svg"
import Organic from "@/components/icons/icon-organic.svg"
import SingleOrigin from "@/components/icons/icon-single-origin.svg"
import MycoFree from "@/components/icons/icon-myco-free.svg"

export function FilterRow({ styleType = "default" }: { styleType?: string; }) {
    return (
        <div className="flex flex-wrap gap-3">
            <FilterToggle
                label="Organic"
                filterKey="is_organic"
                icon={<ScalableIcon icon={<Organic />} size={28} />}
                styleType={styleType}
            />
            <FilterToggle
                label="Single Origin"
                filterKey="is_single_origin"
                icon={<ScalableIcon icon={<SingleOrigin />} size={28} />}
                styleType={styleType}
            />
            <FilterToggle
                label="Decaf / Low Caf"
                filterKey="is_decaf"
                icon={<ScalableIcon icon={<Decaf />} size={28} />}
                styleType={styleType}
            />
            <FilterToggle
                label="Mycotoxin Free"
                filterKey="is_mycotoxin_free"
                icon={<ScalableIcon icon={<MycoFree />} size={28} />}
                styleType={styleType}
            />
        </div>
    )
}