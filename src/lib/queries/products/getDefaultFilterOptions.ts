// lib/queries/getDefaultFilterOptions.ts
import { createClient } from "@/lib/supabase/server";
import type { DefaultFilterOptions } from "@/types/search";

export async function getDefaultFilterOptions(): Promise<DefaultFilterOptions> {
    const supabase = await createClient();

    const [varietalsRes, processesRes, countriesRes] = await Promise.all([
        supabase.from("default_varietals").select("display_name, normalized_name").order("display_name", { ascending: true }),
        supabase.from("default_coffee_processes").select("display_name, normalized_name").order("display_name", { ascending: true }),
        supabase.from("default_origin_countries").select("display_name, normalized_name").order("display_name", { ascending: true }),
    ]);

    if (varietalsRes.error || processesRes.error || countriesRes.error) {
        console.error("Supabase error(s):", varietalsRes.error, processesRes.error, countriesRes.error);
        throw varietalsRes.error || processesRes.error || countriesRes.error;
    }


    return {
        varietals: varietalsRes.data?.map(v => ({
            label: v.display_name,
            value: v.normalized_name,
        })) ?? [],
        processes: processesRes.data?.map(p => ({
            label: p.display_name,
            value: p.normalized_name,
        })) ?? [],
        countries: countriesRes.data?.map(c => ({
            label: c.display_name,
            value: c.normalized_name,
        })) ?? [],

    };
}