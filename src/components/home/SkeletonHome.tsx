import { JSX } from "react";
import SkeletonProductCard from "../skeleton/SkeletonProductCard";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpItem } from "@/utils/animation/index";

export default function SkeletonHome(): JSX.Element {
    return (
        <motion.main
            className="section-layout mt-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            <motion.h2 variants={fadeUpItem}>Loading Specialty Coffee...</motion.h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={fadeUpItem}
            >
                {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div key={i} variants={fadeUpItem}>
                        <SkeletonProductCard />
                    </motion.div>
                ))}
            </motion.div>
        </motion.main>
    );
}
