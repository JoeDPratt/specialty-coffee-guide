import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react' 

export const createClient = cache (async () => {
    console.log("Creating Supabase Server Client (Cached)...");
    const cookieStore = await cookies();
    const client = createServerClient(
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
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Handle potential errors
                    }
                },
            },
        }
    );
    return client
});

export async function getUser() {
    const { auth } = await createClient();
    const userObject = await auth.getUser();

    if(userObject.error) {
        console.error(userObject.error);
        return null;
    }
    
    return userObject.data.user 
}