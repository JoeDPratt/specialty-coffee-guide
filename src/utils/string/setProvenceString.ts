import { Altitude, Provenance } from "@/types/product";

type ProvenanceLabel = keyof Provenance;

interface SetProvenceProps {
    label: ProvenanceLabel;
    value: string[] | Altitude;
    labelDisplayNames: Record<ProvenanceLabel, string[]>
}

export function setProvenceLabelAndValue({
    label,
    value,
    labelDisplayNames
}: SetProvenceProps) {

    if (label === "altitude") {
        let altitudeValue = makeAltitudeString(value as Altitude)
        return {
            valueString: altitudeValue,
            displayLabel: labelDisplayNames[label][0],
            isActive: altitudeValue !== "-"
        }
    }

    const values = value as string[];
    const [singular, plural] = labelDisplayNames[label];

    return {
        valueString: values.join(", "),
        displayLabel: values.length < 2 ? singular : (plural ?? singular),
        isActive: values.length > 0
    }
}

// Makes altitude string if none (-), one (2000) or both values (1900 - 2100) are present
function makeAltitudeString(altitude: Altitude): string {

    const isMin = typeof altitude?.min === "number";
    const isMax = typeof altitude?.max === "number"

    if (!isMin && !isMax) return "-";
    if (altitude.min !== altitude.max) return `${altitude.min} - ${altitude.max}`;
    return isMin ? String(altitude.min) : String(altitude.max);

}