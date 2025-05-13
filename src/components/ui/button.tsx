import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/classes/merge"
import { LoadingDots } from "@/components/shared/loading/LoadingDots"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-lg font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 hover:scale-102 hover:shadow-sm hover:animate-pulse active:scale-98",
    {
        variants: {
            variant: {
                default: "bg-pr-700 text-white hover:bg-pr-700/80",
                soft: "bg-pr-900/60 text-white hover:bg-pr-900/50",
                accent: "bg-pr-500 text-white hover:bg-pr-500/80",
                destructive: "bg-pr-600 text-white hover:bg-pr-600/90",
                secondary: "bg-white text-pr-700 hover:bg-white/80",
                ghost: "hover:bg-pr-100 text-pr-700 hover:shadow-none",
                ghostDark: "hover:bg-white/20 text-white hover:shadow-none",
                link: "text-pr-900 underline-offset-2 underline hover:shadow-none",
            },
            styleType: {
                solid: "",
                outline: "border border-2 bg-transparent",
                outlineLight: "border border-1 bg-transparent",
            },
            size: {
                default: "h-10 px-5 pt-0.25",
                sm: "h-8 px-4 text-base [&_svg]:size-4 pt-0.25",
                lg: "h-12 px-8 text-xl [&_svg]:size-7",
                icon: "size-10 aspect-square gap-0",
                iconLg: "size-12 aspect-square [&_svg]:size-6 gap-0",
                none: "text-base p-0"
            },
            iconPosition: {
                left: "[&_svg]:-ml-1",
                right: "[&_svg]:-mr-1",
            }
        },
        compoundVariants: [
            // DEFAULT outline
            {
                variant: "default",
                styleType: ["outline", "outlineLight"],
                className: "border-pr-700 text-pr-700 hover:bg-white/20",
            },
            {
                variant: "soft",
                styleType: ["outline", "outlineLight"],
                className: "border-pr-700/20 text-pr-700 hover:bg-white/20",
            },
            // SECONDARY outline
            {
                variant: "secondary",
                styleType: ["outline", "outlineLight"],
                className: "border-white text-white hover:bg-white/20",
            },
            // ACCENT outline
            {
                variant: "accent",
                styleType: ["outline", "outlineLight"],
                className: "border-pr-500 text-pr-500 hover:bg-white/20",
            },
            // DESTRUCTIVE outline
            {
                variant: "destructive",
                styleType: ["outline", "outlineLight"],
                className: "border-pr-600 text-pr-600 hover:bg-white/20",
            },

        ],
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
    loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, styleType, size, iconPosition, asChild = false, isLoading = false, loadingText = "", children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, styleType, className, iconPosition }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        {loadingText ?? "Loading"}
                        <LoadingDots />
                    </span>
                ) : (
                    children
                )}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
