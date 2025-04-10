import { JSX } from "react";
import SkeletonProductCard from "../shared/product/SkeletonProductCard";

export default function SkeletonHome() {
    return (
        <main className="layout-container mt-20">
            <h2>Loading Coffee...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonProductCard key={i} />
                ))}
            </div>
        </main>
    )
}