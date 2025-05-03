import _data from "@/assets/data.json"

export interface Manifest {
    id: string
    title: string
    description: string
    author: {
        name: string
        discord?: string
        github?: string
        email?: string
        link?: string
    }
    category: string
    supported: string[]
    new?: boolean
}

export const data = _data as {
    tweaks: {
        [key: string]: {
            files: string[]
            manifest: Manifest
        }
    }
    conflicts: {
        [key: string]: {
            tweaks: string[]
            files: string[]
        }
    }
}

export const supported = [
    {
        id: "x32",
        name: "Faithful 32x",
    },
    {
        id: "x64",
        name: "Faithful 64x",
    },
]

export function getPackName(id: string) {
    return supported.find((pack) => pack.id === id)?.name ?? id
}

export const customTweaks: {
    [key: string]: {
        manifest: {
            id: string
            title: string
            description: string
            category: string
        }
    }
} = {
    "custom-options-background": {
        manifest: {
            id: "custom-options-background",
            title: "Custom Options Background",
            description: "Replace the dirt background with any block texture.",
            category: "gui",
        },
    },
    "custom-peace-and-quiet": {
        manifest: {
            id: "custom-peace-and-quiet",
            title: "Peace and Quiet",
            description: "Reduce volume of sounds.",
            category: "misc",
        },
    },
}

export const customPeaceAndQuiet = {
    rain: {
        name: "Rain 🌧️",
        files: [],
    },
    thunder: {
        name: "Thunder ⚡",
        files: [],
    },
}

export const customOptionsBackgroundTextures = [
    "amethyst_block",
    "ancient_debris_side",
    "andesite",
    "basalt_side",
    "bedrock",
    "blackstone",
    "bone_block_side",
    "calcite",
    "chiseled_deepslate",
    "chiseled_nether_bricks",
    "chiseled_polished_blackstone",
    "chiseled_quartz_block",
    "chiseled_red_sandstone",
    "chiseled_sandstone",
    "chiseled_stone_bricks",
    "clay",
    "coal_block",
    "coal_ore",
    "coarse_dirt",
    "cobbled_deepslate",
    "cobblestone",
    "copper_block",
    "copper_ore",
    "crimson_nylium",
    "crying_obsidian",
    "deepslate",
    "deepslate_bricks",
    "deepslate_coal_ore",
    "deepslate_copper_ore",
    "deepslate_diamond_ore",
    "deepslate_emerald_ore",
    "deepslate_gold_ore",
    "deepslate_iron_ore",
    "deepslate_lapis_ore",
    "deepslate_redstone_ore",
    "deepslate_tiles",
    "diamond_block",
    "diamond_ore",
    "diorite",
    "dirt",
    "dripstone_block",
    "emerald_block",
    "emerald_ore",
    "end_stone",
    "end_stone_bricks",
    "gilded_blackstone",
    "gold_block",
    "gold_ore",
    "granite",
    "gravel",
    "honeycomb_block",
    "iron_block",
    "iron_ore",
    "lapis_block",
    "lapis_ore",
    "magma",
    "moss_block",
    "mossy_cobblestone",
    "mossy_stone_bricks",
    "mud",
    "mud_bricks",
    "netherite_block",
    "netherrack",
    "nether_bricks",
    "nether_gold_ore",
    "nether_quartz_ore",
    "nether_wart_block",
    "obsidian",
    "packed_ice",
    "packed_mud",
    "polished_andesite",
    "polished_basalt_side",
    "polished_blackstone",
    "polished_blackstone_bricks",
    "polished_deepslate",
    "polished_diorite",
    "polished_granite",
    "prismarine",
    "prismarine_bricks",
    "purpur_block",
    "quartz_block_bottom",
    "quartz_bricks",
    "raw_copper_block",
    "raw_gold_block",
    "raw_iron_block",
    "redstone_block",
    "redstone_ore",
    "red_nether_bricks",
    "red_sand",
    "red_sandstone",
    "reinforced_deepslate_bottom",
    "sand",
    "sandstone",
    "smooth_basalt",
    "smooth_stone",
    "snow",
    "soul_sand",
    "soul_soil",
    "sponge",
    "stone",
    "stone_bricks",
    "tuff",
    "tuff_bricks",
    "warped_nylium",
    "warped_wart_block",
    "wet_sponge",
]
