import {selectedPack, selectedTweaks} from "@/lib/state"
import {customTweaks} from "@/lib/tweaks/custom-tweak"
import {tweaks, type PackID, type TweakID} from "@/lib/tweaks/tweak"

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"

function encodeIndex(index: number): string {
    const place0 = index % chars.length
    const place1 = Math.floor(index / chars.length) % chars.length
    return chars[place1] + chars[place0]
}

function decodeIndex(encoded: string): number {
    const place0 = chars.indexOf(encoded[1])
    const place1 = chars.indexOf(encoded[0])
    return place0 + place1 * chars.length
}

function encodeSelectedTweaks(): string {
    return selectedTweaks.value
        .values()
        .map((tweak) => (tweaks[tweak] ? encodeIndex(tweaks[tweak].index) : null))
        .filter(Boolean)
        .toArray()
        .join("")
}

function decodeSelectedTweaks(encoded: string): Set<TweakID> {
    const selectedTweaks: Set<TweakID> = new Set()
    for (let i = 0; i < encoded.length; i += 2) {
        const index = decodeIndex(encoded.slice(i, i + 2))
        const tweakID = Object.values(tweaks).find((tweak) => tweak.index === index)
        if (tweakID) {
            selectedTweaks.add(tweakID.id)
        }
    }
    return selectedTweaks
}

export function createShareURL({utmCampaign}: {utmCampaign: string}): string {
    const url = new URL(window.location.href)
    url.searchParams.set("pack", selectedPack.value)
    url.searchParams.set("tweaks", encodeSelectedTweaks())
    if (utmCampaign) {
        url.searchParams.set("utm_campaign", utmCampaign)
    }
    for (const {createShareURL} of Object.values(customTweaks)) {
        createShareURL(url)
    }
    return url.toString()
}

export function loadShareURL() {
    const url = new URL(window.location.href)
    const pack = url.searchParams.get("pack")
    const tweaks = url.searchParams.get("tweaks")
    if (pack) {
        selectedPack.value = pack as PackID
    }
    if (tweaks) {
        selectedTweaks.value = decodeSelectedTweaks(tweaks)
    }
    for (const {loadShareURL} of Object.values(customTweaks)) {
        loadShareURL(url)
    }
}
