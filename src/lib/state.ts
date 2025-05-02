import {supported} from "@/lib/tweaks/tweak"
import {signal} from "@preact/signals-react"
import {produce} from "immer"

export const pack = signal<string>(supported[0].id)

export const tweaks = signal<string[]>([])

export const search = signal<string>("")

export const customOptionsBackgroundTexture = signal<string | null>(null)

export function createShareURL() {
    const data = pack.value + "," + tweaks.value.join(",")
    return `${window.location.origin}/share?data=${data}`
}

export function loadShareURL(shareURL: string) {
    const data = shareURL.slice(window.location.origin.length + "/share?data=".length)
    const [packValue, ...tweaksValue] = data.split(",")
    pack.value = packValue
    tweaks.value = tweaksValue
}

export function setTweakSelection(id: string) {
    return (value: boolean) => {
        tweaks.value = produce(tweaks.value, (tweaks) => {
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
}
