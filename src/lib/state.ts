import {tweaks, type PackID, type TweakID} from "@/lib/tweaks/tweak"
import {signal} from "@preact/signals-react"

export const selectedPack = signal<PackID>("x32")

export const selectedTweaks = signal<Set<TweakID>>(new Set())

export const search = signal<string>("")

function updateSelections(ids: TweakID[], add: boolean) {
    const s = new Set(selectedTweaks.value)
    ids.forEach((id) => (add ? s.add(id) : s.delete(id)))
    selectedTweaks.value = s
}

export function setTweakSelection(id: TweakID, value: boolean) {
    updateSelections([id], value)
}

export function setCategorySelection(category: string, value: boolean) {
    const ids = Object.values(tweaks)
        .filter((t) => t.category === category)
        .map((t) => t.id)
    updateSelections(ids, value)
}

export function isCategorySelected(category: string) {
    return Object.values(tweaks)
        .filter((t) => t.category === category)
        .every((t) => selectedTweaks.value.has(t.id))
}
