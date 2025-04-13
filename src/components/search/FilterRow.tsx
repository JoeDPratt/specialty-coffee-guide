import { useState } from "react"
import { FilterToggle } from "@/components/search/FilterToggle"
import { ScalableIcon } from "../icons/ScalableIcon"
import Decaf from "@/components/icons/icon-decaf.svg"
import Organic from "@/components/icons/icon-organic.svg"
import SingleOrigin from "@/components/icons/icon-single-origin.svg"
import MycoFree from "@/components/icons/icon-myco-free.svg"

export function FilterRow() {
    const [filters, setFilters] = useState({
        organic: false,
        decaf: false,
        mycotoxinFree: false,
        singleOrigin: false
    })

    const toggle = (key: keyof typeof filters) =>
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }))

    return (
        <div className="flex flex-wrap gap-3">
            <FilterToggle
                label="Organic"
                icon={<ScalableIcon icon={<Organic />} size={28} />}
                selected={filters.organic}
                onClick={() => toggle("organic")}
            />
            <FilterToggle
                label="Single Origin"
                icon={<ScalableIcon icon={<SingleOrigin />} size={28} />}
                selected={filters.singleOrigin}
                onClick={() => toggle("singleOrigin")}
            />
            <FilterToggle
                label="Decaf / Low Caf"
                icon={<ScalableIcon icon={<Decaf />} size={28} />}
                selected={filters.decaf}
                onClick={() => toggle("decaf")}
            />
            <FilterToggle
                label="Mycotoxin Free"
                icon={<ScalableIcon icon={<MycoFree />} size={28} />}
                selected={filters.mycotoxinFree}
                onClick={() => toggle("mycotoxinFree")}
            />
        </div>
    )
}
