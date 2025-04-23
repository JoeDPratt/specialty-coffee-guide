// /lib/db/products.ts

import { cache } from "react"; // Import cache from React
import { fetchProductCards } from "./getProductCard";

export const getProductsByRoasterSlug = cache(async (slug: string, limit = 4) =>
    fetchProductCards(q => q.eq("coffee_roasters.slug", slug).limit(limit))
);