// lib/queries/getDefaultFilterOptions.ts
import { createClient } from "@/lib/supabase/server";
import type { DefaultFilterOptions } from "@/types/search";

export async function getDefaultFilterOptions(): Promise<DefaultFilterOptions> {
    const supabase = await createClient();

    const [varietalsRes, processesRes, countriesRes] = await Promise.all([
        supabase.from("default_varietals").select("display_name").order("display_name", { ascending: true }),
        supabase.from("default_coffee_processes").select("display_name").order("display_name", { ascending: true }),
        supabase.from("default_origin_countries").select("display_name").order("display_name", { ascending: true }),
    ]);

    if (varietalsRes.error || processesRes.error || countriesRes.error) {
        console.error("Supabase error(s):", varietalsRes.error, processesRes.error, countriesRes.error);
        throw varietalsRes.error || processesRes.error || countriesRes.error;
    }

    return {
        varietals: varietalsRes.data?.map((v) => String(v.display_name)).filter(Boolean) ?? [],
        processes: processesRes.data?.map((p) => String(p.display_name)).filter(Boolean) ?? [],
        countries: countriesRes.data?.map((c) => String(c.display_name)).filter(Boolean) ?? [],
    };
}