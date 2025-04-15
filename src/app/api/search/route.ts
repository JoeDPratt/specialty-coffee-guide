import { NextRequest, NextResponse } from 'next/server';
import { getSearchResults } from '@/lib/queries/products/getSearchResults';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get('q') ?? undefined;
    const is_organic = searchParams.get('is_organic') === 'true';
    const is_decaf = searchParams.get('is_decaf') === 'true';
    const is_mycotoxin_free = searchParams.get('is_mycotoxin_free') === 'true';
    const is_single_origin = searchParams.get('is_single_origin') === 'true';

    const products = await getSearchResults({
        q,
        is_organic,
        is_decaf,
        is_mycotoxin_free,
        is_single_origin,
    });

    return NextResponse.json(products);
}
