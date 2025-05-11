export function FlavourTag({ flavour }: { flavour: string }) {
    return (
        <span className="text-pr-900 text-base font-normal capitalize">
            {flavour}
        </span>
    );
}