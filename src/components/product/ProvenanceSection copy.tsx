import { Altitude, Provenance } from "@/types/product";
import { JSX } from "react";

type ProvenanceLabel = keyof Provenance;

interface ProvenanceItemProps {
    label: ProvenanceLabel;
    value: string[] | Altitude;
    isActive?: boolean;
}

interface ProvenanceSectionProps {
    provenanceData: Provenance;
}

const labelDisplayNames: Record<ProvenanceLabel, string[]> = {
    origin_countries: ["Country", "Countries"],
    origin_regions: ["Region", "Regions"],
    producers: ["Producer", "Producers"],
    altitude: ["Altitude (masl)"],
    varietals: ["Variety", "Varietals"],
    processes: ["Process", "Processes"],
};

function ProvenanceItem({ label, value }: ProvenanceItemProps): JSX.Element {
    const isAltitude = label === "altitude";

    let isActive: boolean;
    let valueString: string;
    let displayLabel: string;

    if (isAltitude) {
        const altitude = value as Altitude;
        isActive = typeof altitude?.min === 'number' && typeof altitude?.max === 'number';
        valueString = isActive ? `${altitude.min} - ${altitude.max}` : "-";
        displayLabel = labelDisplayNames[label][0]; // no plural needed
    } else {
        const values = value as string[];
        isActive = values.length > 0;
        valueString = typeof values[0] === "number" ? values.join(" - ") : values.join(", ");
        const [singular, plural] = labelDisplayNames[label];
        displayLabel = values.length < 2 ? singular : plural ?? singular;
    }

    return (
        <div
            className="font-sofia-sans text-pr-800 dark:text-white text-lg w-1/2 @sm:w-1/3 pb-6.5 pr-6"
            role="listitem"
            aria-label={`${displayLabel}: ${isActive ? valueString : "Not specified"}`}
        >
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
    );
}


export default function ProvenanceSection({
    provenanceData,
}: ProvenanceSectionProps): JSX.Element {
    const entries = Object.entries(
        provenanceData
    ) as [keyof Provenance, string[] | Altitude][];

    return (
        <section
            className="flex flex-row flex-wrap"
            role="region"
            aria-labelledby="provenance-heading"
        >
            <h3 id="provenance-heading" className="sr-only">
                Coffee provenance details
            </h3>
            <div role="list" className="flex flex-row flex-wrap w-full">
                {entries.map(([key, value]) => (
                    <ProvenanceItem key={key} label={key} value={value} />
                ))}
            </div>
        </section>
    );
}
