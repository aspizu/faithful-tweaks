import CustomTweak from "@/components/custom-tweak"
import {SearchBox} from "@/components/ui/searchbox"
import {selectedPack, selectedTweaks, setTweakSelection} from "@/lib/state"
import type {Manifest} from "@/lib/tweaks/custom-tweak"
import {Packager} from "@/lib/tweaks/packager"
import {BASE_URL, cn} from "@/lib/utils"
import {signal, useSignal} from "@preact/signals-react"

const textures = [
    "dirt",
    "stone",
    "smooth_stone",
    "granite",
    "polished_granite",
    "diorite",
    "polished_diorite",
    "andesite",
    "polished_andesite",
    "deepslate",
    "polished_deepslate",
    "cobblestone",
    "mossy_cobblestone",
    "tuff",
    "calcite",
    "snow",
    // "prismarine", // TODO: prismarine.png is a animation strip
    "prismarine_bricks",
    "dark_prismarine",
    // "grass", // TODO: grass.png is black-and-white
    "moss_block",
    "tube_coral_block",
    "brain_coral_block",
    "bubble_coral_block",
    "fire_coral_block",
    "horn_coral_block",
    "netherrack",
    "basalt_side",
    "smooth_basalt",
    "polished_basalt_side",
    "blackstone",
    "polished_blackstone",
    // "lava", // TODO: lava texture is a animation strip
    "end_stone",
    "bedrock",
    "oak_planks",
    "spruce_planks",
    "birch_planks",
    "jungle_planks",
    "acacia_planks",
    "dark_oak_planks",
    "mangrove_planks",
    "cherry_planks",
    "bamboo_planks",
    "crimson_planks",
    "warped_planks",
    "bamboo_block",
    "coal_block",
    "iron_block",
    "copper_block",
    "exposed_copper",
    "weathered_copper",
    "oxidized_copper",
    "redstone_block",
    "lapis_block",
    "gold_block",
    "diamond_block",
    "emerald_block",
    "amethyst_block",
    "quartz_block_side",
    "netherite_block",
    "ancient_debris_side",
    "slime_block",
    "honey_block_side",
    "honeycomb_block",
    "white_concrete",
    "light_gray_concrete",
    "gray_concrete",
    "black_concrete",
    "brown_concrete",
    "red_concrete",
    "orange_concrete",
    "yellow_concrete",
    "lime_concrete",
    "green_concrete",
    "cyan_concrete",
    "light_blue_concrete",
    "blue_concrete",
    "purple_concrete",
    "magenta_concrete",
    "pink_concrete",
]

export const selectedTexture = signal<string | null>(null)

export const manifest: Manifest = {
    id: "custom-options-background",
    title: "Custom Options Background",
    description: "Replace the dirt background with any block texture.",
    author: {
        name: "aspizu",
        github: "aspizu",
    },
    category: "gui",
    isNew: false,
    packsSupported: ["x32", "x64"],
}

export function Component() {
    const query = useSignal("")
    return (
        <CustomTweak id="custom-options-background">
            <SearchBox
                value={query.value}
                onChange={(ev) => {
                    query.value = ev.currentTarget.value
                }}
                onClear={() => {
                    query.value = ""
                }}
            />
            <div className="grid max-h-[256px] grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-1 overflow-y-auto">
                {textures
                    .filter((texture) =>
                        texture
                            .toLowerCase()
                            .includes(query.value.trim().toLowerCase()),
                    )
                    .map((texture) => (
                        <TextureButton key={texture} texture={texture} />
                    ))}
            </div>
        </CustomTweak>
    )
}

function TextureButton({texture}: {texture: string}) {
    const isSelected =
        selectedTweaks.value.has("custom-options-background")
        && selectedTexture.value === texture
    return (
        <button
            className={cn(
                "rounded-sm outline-2 -outline-offset-2 outline-transparent transition-all",
                isSelected && "outline-white",
            )}
            onClick={() => {
                selectedTexture.value = texture
                setTweakSelection("custom-options-background", true)
            }}
        >
            <img
                key={texture}
                src={`${BASE_URL}/packs/${selectedPack.value}/assets/minecraft/textures/block/${texture}.png`}
                className={cn(
                    "rendering-pixelated aspect-square w-full rounded",
                    isSelected && "border-4 border-solid border-black",
                )}
            />
        </button>
    )
}

export async function logic(packager: Packager) {
    await packager.addAsset(
        `/packs/${selectedPack.value}/assets/minecraft/textures/block/${selectedTexture.value}.png`,
        "assets/minecraft/textures/gui/options_background.png",
    )
}

export function createShareURL(url: URL) {
    if (
        selectedTweaks.value.has("custom-options-background")
        && selectedTexture.value
    ) {
        url.searchParams.set("o", selectedTexture.value)
    }
}

export function loadShareURL(url: URL) {
    const optbg = url.searchParams.get("o")
    if (optbg && textures.includes(optbg)) {
        selectedTexture.value = optbg
    }
}
