import _tweaks from "@/assets/tweaks.json"
import {customTweaks, Manifest} from "@/lib/tweaks/custom-tweak"

export const tweaks = _tweaks as Record<TweakID, Tweak>

export const categories = ["aesthetic", "retro", "gui"] as const

export const manifests = Object.values(tweaks).concat(
    Object.values(customTweaks).map((t) => t.manifest) as any,
) as (Tweak | Manifest)[]

export const packs = {
    x32: {name: "Faithful 32x"},
    x64: {name: "Faithful 64x"},
}

export type TweakID = keyof typeof _tweaks | keyof typeof customTweaks
export type PackID = keyof typeof packs
export type Category = (typeof categories)[number]

export interface TweakAuthor {
    name: string
    discord?: string
    github?: string
    email?: string
    link?: string
}

export interface Tweak {
    index: number
    id: TweakID
    category: Category
    title: string
    description: string
    author: TweakAuthor
    isNew: boolean
    files: string[]
    packsSupported: PackID[]
}
