import {Switch} from "@/components/ui/switch"
import {setTweakSelection, tweaks} from "@/lib/state"
import {customTweaks} from "@/lib/tweaks/tweak"

export interface CustomTweakProps {
    id: `custom-${string}`
    children?: any
}

export default function CustomTweak({id, children}: CustomTweakProps) {
    const {title, description} = customTweaks[id]
    return (
        <div className="overlapping-grid-layer flex h-full w-full flex-col gap-2 rounded-xl border bg-transparent p-2">
            <div className="flex">
                <div className="mr-auto flex flex-col">
                    <span className="font-semibold">{title}</span>
                    <span
                        className="text-muted-foreground text-xs"
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></span>
                </div>
                <Switch
                    checked={tweaks.value.includes(id)}
                    onCheckedChange={setTweakSelection(id)}
                />
            </div>
            {children}
        </div>
    )
}
