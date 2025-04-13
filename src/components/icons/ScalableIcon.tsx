import React from "react";
import { cn } from "@/utils/classes/merge";

type ScalableIconProps = {
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    size?: number; // size in pixels (width and height)
};

export function ScalableIcon({ icon, size = 32 }: ScalableIconProps) {
    return (
        <span
            style={{ width: size, height: size }}
            className="shrink-0 flex items-center justify-center"
        >
            {React.cloneElement(icon, {
                className: cn("w-full h-full block", icon.props.className),
                style: { width: "100%", height: "100%" },
            })}
        </span>
    );
}
