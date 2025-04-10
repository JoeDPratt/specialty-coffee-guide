import type { Altitude, Provenance } from "@/types/product";
import type { JSX } from "react";
import CountryIcon from "@public/icons/icon-countries.svg";
import RegionIcon from "@public/icons/icon-regions.svg";
import ProducerIcon from "@public/icons/icon-producers.svg";
import ProcessIcon from "@public/icons/icon-processes.svg";
import AltitudeIcon from "@public/icons/icon-altitude.svg";
import VarietalIcon from "@public/icons/icon-varietals.svg";

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
    const isAltitude = label === "altitude";

    let isActive: boolean;
    let valueString: string;
    let displayLabel: string;
    const Icon = iconMap[label];

    if (isAltitude) {
        const altitude = value as Altitude;
        isActive =
            typeof altitude?.min === "number" && typeof altitude?.max === "number";
        valueString = isActive ? `${altitude.min} - ${altitude.max}` : "-";
        displayLabel = labelDisplayNames[label][0]; // no plural needed
    } else {
        const values = value as string[];
        isActive = values.length > 0;
        valueString =
            typeof values[0] === "number" ? values.join(" - ") : values.join(", ");
        const [singular, plural] = labelDisplayNames[label];
        displayLabel = values.length < 2 ? singular : (plural ?? singular);
    }

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
                    <div className="font-medium text-pr-400">
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
