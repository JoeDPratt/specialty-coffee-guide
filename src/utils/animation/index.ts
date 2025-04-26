// utils/animations/index.ts

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const fadeUpItem = {
    hidden: {
        opacity: 0,
        y: 20, // 👈 More subtle vertical offset
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: 4, // 👈 Slight upward movement on exit
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
}


export const subtleSpring = {
    type: "spring",
    stiffness: 200,
    damping: 30,
    mass: 0.8,
};

export const tooltipMotion = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.15 },
};
