import CustomTweak from "@/components/custom-tweaks/custom-tweak"
import {
    customOptionsBackgroundTexture,
    pack,
    setTweakSelection,
    tweaks,
} from "@/lib/state"
import {customOptionsBackgroundTextures} from "@/lib/tweaks/tweak"
import {BASE_URL, cn} from "@/lib/utils"

export default function CustomOptionsBackgroundTweak() {
    return (
        <CustomTweak id="custom-options-background">
            <div className="grid max-h-[256px] grid-cols-[repeat(auto-fit,64px)] gap-1 overflow-y-auto">
                {customOptionsBackgroundTextures.map((texture) => (
                    <TextureButton key={texture} texture={texture} />
                ))}
            </div>
        </CustomTweak>
    )
}

function TextureButton({texture}: {texture: string}) {
    const isSelected =
        tweaks.value.includes("custom-options-background")
        && customOptionsBackgroundTexture.value === texture
    return (
        <button
            className={cn(
                "rounded-sm outline-2 -outline-offset-2 outline-transparent transition-all",
                isSelected && "outline-white",
            )}
            onClick={() => {
                customOptionsBackgroundTexture.value = texture
                setTweakSelection("custom-options-background")(true)
            }}
        >
            <img
                key={texture}
                src={`${BASE_URL}/packs/${pack.value}/assets/minecraft/textures/block/${texture}.png`}
                className="rendering-pixelated size-[64px] rounded"
            />
        </button>
    )
}
