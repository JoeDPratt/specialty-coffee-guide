export function normalizeBool(val: boolean | null | undefined): boolean {
    return val ?? false;
}