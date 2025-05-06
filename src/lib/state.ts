import {cacheTweak} from "@/lib/tweaks/package"
import {customPeaceAndQuiet, data, supported} from "@/lib/tweaks/tweak"
import {signal} from "@preact/signals-react"
import {produce} from "immer"

export const pack = signal<string>(supported[0].id)

export const tweaks = signal<string[]>([])

export const search = signal<string>("")

export const customOptionsBackgroundTexture = signal<string | null>(null)

export const customPeaceAndQuietSelection = signal<{
    [K in keyof typeof customPeaceAndQuiet]?: boolean
}>({})

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

interface Share {
    pack: string
    tweaks: number[]
    cobt: string | null
    cpnq: string[]
}

export function createShareURL() {
    const url = new URL(window.location.href)
    url.searchParams.set(
        "share",
        JSON.stringify({
            pack: pack.value,
            tweaks: tweaks.value
                .filter((tweak) => !tweak.startsWith("custom-"))
                .map((tweak) => data.tweaks[tweak].manifest.index),
            cobt: customOptionsBackgroundTexture.value,
            cpnq: Object.entries(customPeaceAndQuietSelection.value)
                .filter(([_, value]) => value)
                .map(([key]) => key),
        } satisfies Share),
    )
    return url.toString()
}

export async function loadShareURL() {
    const url = new URL(window.location.href)
    const share = url.searchParams.get("share")
    if (!share) return
    const shared = JSON.parse(share) as Share
    pack.value = shared.pack
    const newtweaks = shared.tweaks.map(
        (index: number) =>
            Object.values(data.tweaks).find((tweak) => tweak.manifest.index === index)!
                .manifest.id,
    )
    if (shared.cobt) {
        newtweaks.push("custom-options-background")
    }
    if (shared.cpnq.length > 0) {
        newtweaks.push("custom-peace-and-quiet")
    }
    tweaks.value = newtweaks
    customOptionsBackgroundTexture.value = shared.cobt
    customPeaceAndQuietSelection.value = Object.fromEntries(
        shared.cpnq.map((key) => [key, true]),
    )
    await Promise.all(tweaks.value.map(cacheTweak))
}
