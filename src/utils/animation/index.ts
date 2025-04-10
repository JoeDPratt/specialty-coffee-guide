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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.25,
            ease: 'easeOut',
        },
    },
};

export const subtleSpring = {
    type: 'spring',
    stiffness: 200,
    damping: 30,
    mass: 0.8,
};
