import TweakAuthor from "@/components/tweak-author"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Switch} from "@/components/ui/switch"
import {selectedPack, selectedTweaks, setTweakSelection} from "@/lib/state"
import {cacheTweak} from "@/lib/tweaks/packager"
import {packs, type Tweak} from "@/lib/tweaks/tweak"
import {BASE_URL, cn} from "@/lib/utils"
import {BanIcon} from "lucide-react"

function UnsupportedAlert() {
    return (
        <Alert className="overlapping-grid-layer w-[75%]">
            <BanIcon className="size-4" />
            <AlertTitle>Not supported for {packs[selectedPack.value].name}</AlertTitle>
            <AlertDescription className="text-xs">
                Please select a different pack in the settings.
            </AlertDescription>
        </Alert>
    )
}

export default function Tweak({id, title, description, packsSupported, author}: Tweak) {
    const isUnsupported = !packsSupported.includes(selectedPack.value)
    const previewImage =
        isUnsupported ?
            `${BASE_URL}/tweaks/${id}/${packsSupported[0]}/preview.avif`
        :   `${BASE_URL}/tweaks/${id}/${selectedPack.value}/preview.avif`

    return (
        <div className="overlapping-grid place-items-center">
            <div
                className={cn(
                    "overlapping-grid-layer flex h-full w-full flex-col gap-2 rounded-xl border bg-transparent p-2",
                    isUnsupported && "opacity-50",
                )}
            >
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
                        disabled={isUnsupported}
                        checked={selectedTweaks.value.includes(id)}
                        onCheckedChange={(value) => {
                            cacheTweak(id)
                            setTweakSelection(id, value)
                        }}
                    />
                </div>
                <img className="mt-auto aspect-[4/3] rounded-sm" src={previewImage} />
            </div>
            {isUnsupported && <UnsupportedAlert />}
        </div>
    )
}
