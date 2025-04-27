import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        // Match everything except:
        //   • Next.js internals (_next/static, _next/image)
        //   • favicon.ico
        //   • manifest.json
        //   • any file with those image extensions
        "/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",

    ],
};

export async function updateSession(request: NextRequest) {
    const supabaseResponse = NextResponse.next({
        request,
    });

    // const supabase = createServerClient(
    //     process.env.SUPABASE_URL!,
    //     process.env.SUPABASE_ANON_KEY!,
    //     {
    //         cookies: {
    //             getAll() {
    //                 return request.cookies.getAll()
    //             },
    //             setAll(cookiesToSet) {
    //                 cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
    //                 supabaseResponse = NextResponse.next({
    //                     request,
    //                 })
    //                 cookiesToSet.forEach(({ name, value, options }) =>
    //                     supabaseResponse.cookies.set(name, value, options)
    //                 )
    //             },
    //         },
    //     }
    // )

    // const {
    //     data: { user },
    // } = await supabase.auth.getUser()

    return supabaseResponse;
}
