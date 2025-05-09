import {Button} from "@/components/ui/button"
import {SearchIcon, XIcon} from "lucide-react"
import * as React from "react"

export function SearchBox({
    className,
    type,
    onClear,
    ...props
}: React.ComponentProps<"input"> & {
    onClear?: () => void
}) {
    return (
        <div className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/10 border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-8 w-full min-w-0 items-center rounded-md border bg-transparent px-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <input
                type={type}
                data-slot="input"
                className="w-full focus:outline-none"
                {...props}
            />
            {props.value && (
                <Button
                    size="icon"
                    variant="ghost"
                    className="mr-2 size-6"
                    onClick={onClear}
                >
                    <XIcon />
                </Button>
            )}
            <SearchIcon className="size-4 shrink-0" />
        </div>
    )
}
