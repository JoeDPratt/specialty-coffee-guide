export function FlavourTag({ flavour, lastItem }: { flavour: string; lastItem?: boolean }) {
    return (
        <span className="text-pr-900 text-lg font-normal capitalize leading-4">
            {flavour}{!lastItem && ","}
        </span>
    );
}