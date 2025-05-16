import TweakAuthor from "@/components/tweak-author"
import {Switch} from "@/components/ui/switch"
import {selectedTweaks, setTweakSelection} from "@/lib/state"
import {customTweaks} from "@/lib/tweaks/custom-tweak"

export interface CustomTweakProps {
    id: keyof typeof customTweaks
    children?: any
    onCheckedChange?: (value: boolean) => void
}

export default function CustomTweak({id, children, onCheckedChange}: CustomTweakProps) {
    const {title, description, author} = customTweaks[id].manifest
    return (
        <div className="overlapping-grid-layer flex h-full w-full flex-col gap-2 rounded-xl border bg-transparent p-2">
            <div className="flex">
                <div className="mr-auto flex flex-col">
                    <span className="font-semibold">{title}</span>
                    <span
                        className="text-muted-foreground text-xs"
                        dangerouslySetInnerHTML={{__html: description}}
                    />
                    <TweakAuthor {...author} />
                </div>
                <Switch
                    checked={selectedTweaks.value.has(id)}
                    onCheckedChange={(value) => {
                        setTweakSelection(id, value)
                        onCheckedChange?.(value)
                    }}
                />
            </div>
            {children}
        </div>
    )
}
