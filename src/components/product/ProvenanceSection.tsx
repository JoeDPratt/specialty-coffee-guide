import type { Altitude, Provenance } from "@/types/product";
import type { JSX } from "react";
import CountryIcon from "@/components/icons/icon-countries.svg";
import RegionIcon from "@/components/icons/icon-regions.svg";
import ProducerIcon from "@/components/icons/icon-producers.svg";
import ProcessIcon from "@/components/icons/icon-processes.svg";
import AltitudeIcon from "@/components/icons/icon-altitude.svg";
import VarietalIcon from "@/components/icons/icon-varietals.svg";
import { setProvenceLabelAndValue } from "@/utils/string/setProvenceString";

type ProvenanceLabel = keyof Provenance;

interface ProvenanceItemProps {
    label: ProvenanceLabel;
    value: string[] | Altitude;
    isActive?: boolean;
}

interface ProvenanceSectionProps {
    provenanceData: Provenance;
}

type IconProps = {
    className?: string;
};

const labelDisplayNames: Record<ProvenanceLabel, string[]> = {
    origin_countries: ["Country", "Countries"],
    origin_regions: ["Region", "Regions"],
    producers: ["Producer", "Producers"],
    altitude: ["Altitude (masl)"],
    varietals: ["Variety", "Varietals"],
    processes: ["Process", "Processes"],
};

const iconMap: Record<string, React.ComponentType<IconProps>> = {
    origin_countries: CountryIcon,
    origin_regions: RegionIcon,
    producers: ProducerIcon,
    altitude: AltitudeIcon,
    varietals: VarietalIcon,
    processes: ProcessIcon,
};

function ProvenanceItem({ label, value }: ProvenanceItemProps): JSX.Element {

    const Icon = iconMap[label];
    const { valueString, displayLabel, isActive } = setProvenceLabelAndValue({ label, value, labelDisplayNames });

    return (
        <div
            className="flex flex-col xs:flex-row gap-1.5 font-sofia-sans text-pr-800 dark:text-white text-lg w-[calc(50%-8px)] pb-6.5 pr-3
             xs:pr-6"
            role="listitem"
            aria-label={`${displayLabel}: ${isActive ? valueString : "Not specified"}`}
        >
            <div className="w-12 shrink-0 items-start align-top">
                <Icon className="w-full h-auto object-cover fill-pr-800 -ml-0.5" />
            </div>
            <div>
                <div className="font-extralight pb-0.5">{displayLabel}</div>
                {isActive ? (
                    <div className="font-medium leading-6">{valueString}</div>
                ) : (
                    <div className="font-medium text-pr-800/50">
                        <span className="sr-only">Not specified</span>
                        <span aria-hidden="true">-</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProvenanceSection({
    provenanceData,
}: ProvenanceSectionProps): JSX.Element {
    const entries = Object.entries(provenanceData) as [
        keyof Provenance,
        string[] | Altitude,
    ][];

    return (
        <section
            className="flex flex-row flex-wrap"
            role="region"
            aria-labelledby="provenance-heading"
        >
            <h3 id="provenance-heading" className="sr-only">
                Coffee provenance details
            </h3>
            <div role="list" className="flex flex-row flex-wrap w-full gap-4">
                {entries.map(([key, value]) => (
                    <ProvenanceItem key={key} label={key} value={value} />
                ))}
            </div>
        </section>
    );
}
