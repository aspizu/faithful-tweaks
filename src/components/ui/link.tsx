import {cn} from "@/lib/utils"
import {ComponentPropsWithRef} from "react"

export type LinkProps = ComponentPropsWithRef<"a">

export default function Link({className, children, ...props}: LinkProps) {
    return (
        <a
            {...props}
            className={cn(
                "inline-block underline decoration-[1.5px] underline-offset-4 transition-opacity hover:opacity-75 active:opacity-50",
                className,
            )}
        >
            {children}
        </a>
    )
}
