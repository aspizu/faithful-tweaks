import {customOptionsBackgroundTexture, pack, tweaks} from "@/lib/state"
import {data} from "@/lib/tweaks/tweak"
import {BASE_URL} from "@/lib/utils"
import {saveAs} from "file-saver"
import JSZip from "jszip"

const langs: Record<string, Record<string, string>> = {}

async function addAsset(zip: JSZip, path: string, name: string) {
    const response = await fetch(BASE_URL + path)
    let blob = await response.blob()
    if (name.startsWith("/assets/minecraft/lang/") && name.endsWith(".json")) {
        if (name in langs) {
            Object.assign(langs[name], await blob.json())
            blob = new Blob([JSON.stringify(langs[name], null, 2)], {
                type: "application/json",
            })
        } else {
            langs[name] = await blob.json()
        }
    }
    zip.file(name, blob)
}

async function customOptionsBackgroundTweak(zip: JSZip) {
    await addAsset(
        zip,
        `/packs/${pack.value}/assets/minecraft/textures/block/${customOptionsBackgroundTexture.value}.png`,
        `assets/minecraft/textures/gui/options_background.png`,
    )
}

export async function createPackage() {
    const resolved: string[] = []
    const zip = new JSZip()
    if (tweaks.value.includes("custom-options-background")) {
        await customOptionsBackgroundTweak(zip)
    }
    for (const [conflictId, conflict] of Object.entries(data.conflicts)) {
        if (conflict.tweaks.every((tweakId) => tweaks.value.includes(tweakId))) {
            resolved.push(...conflict.tweaks)
            for (const file of conflict.files) {
                await addAsset(
                    zip,
                    `/conflicts/${conflictId}/${pack.value}/${file}`,
                    file,
                )
            }
        }
    }
    for (const tweakId of tweaks.value) {
        if (tweakId.startsWith("custom-")) continue
        if (resolved.includes(tweakId)) continue
        resolved.push(tweakId)
        const {files} = data.tweaks[tweakId]
        for (const file of files) {
            if (file === "preview.avif") continue
            await addAsset(zip, `/tweaks/${tweakId}/${pack.value}/${file}`, file)
        }
    }
    await addAsset(zip, "/LICENSE.txt", "/LICENSE.txt")
    zip.file(
        "credits.txt",
        `
Credits:
Vanilla Tweaks: https://vanillatweaks.net/
Faithful Pack: https://faithfulpack.net/`.slice(1),
    )
    zip.file(
        "pack.mcmeta",
        JSON.stringify({
            pack: {
                pack_format: 46,
                description: `Made with ${location.origin}`,
            },
        }),
    )
    const blob = await zip.generateAsync({type: "blob"})
    saveAs(blob, "faithful-tweaks.zip")
}
