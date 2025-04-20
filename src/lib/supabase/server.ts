// /lib/supabase/server.ts
"use server";

import { cache } from "react";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export const createClient = cache(async (): Promise<
    SupabaseClient<Database, "public", any>
> => {
    // Grab incoming cookies for auth
    const cookieStore = await cookies();

    const client = createServerClient<Database, "public">(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch {
                        // swallow cookie errors
                    }
                },
            },
        },
    );

    return client;
});


export async function getUser() {
    const { auth } = await createClient();
    const userObject = await auth.getUser();

    if (userObject.error) {
        console.error(userObject.error);
        return null;
    }

    return userObject.data.user;
}
