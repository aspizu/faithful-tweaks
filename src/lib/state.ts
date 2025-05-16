import {type PackID, type TweakID} from "@/lib/tweaks/tweak"
import {signal} from "@preact/signals-react"
import {produce} from "immer"

export const selectedPack = signal<PackID>("x32")

export const selectedTweaks = signal<TweakID[]>([])

export const search = signal<string>("")

export function setTweakSelection(id: TweakID, value: boolean) {
    selectedTweaks.value = produce(selectedTweaks.value, (tweaks) => {
        const index = tweaks.indexOf(id)
        if (value) {
            if (index === -1) {
                tweaks.push(id)
            }
        } else {
            if (index !== -1) {
                tweaks.splice(index, 1)
            }
        }
        tweaks.sort()
    })
}
