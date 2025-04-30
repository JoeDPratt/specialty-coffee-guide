import * as React from "react"
import { cn } from "@/utils/classes/merge"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
    "flex h-10 w-full rounded-full font-sofia-sans text-left border border-white bg-white px-3 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-pr-900/60 disabled:cursor-not-allowed disabled:opacity-40 cursor-text hide-search-clear focus-visible:outline-none",
    {
        variants: {
            inputSize: {
                default: "text-base pb-0.5 px-4 h-10",
                lg: "text-lg pb-0.5 px-5 h-12",
                sm: "text-sm py-1 px-3"
            },
            intent: {
                default: "",
                search: ""
            },
            focus: {
                default: "focus-visible:ring-1 focus-visible:ring-ring",
                parent: ""
            }
        },
        defaultVariants: {
            inputSize: "default",
            intent: "default"
        }
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, inputSize, intent, focus, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ inputSize, intent, focus }), className)}
                ref={ref}
                {...props}
            />
        )
    }
)

Input.displayName = "Input"

export { Input, inputVariants }
