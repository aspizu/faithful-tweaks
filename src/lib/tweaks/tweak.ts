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
    version: string
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
        title: string
        description: string
    }
} = {
    "custom-menu-background": {
        title: "Custom Menu Background",
        description: "Replace the dirt background with any block texture.",
    },
}
