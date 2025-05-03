import {customOptionsBackgroundTexture, pack, tweaks} from "@/lib/state"
import {data} from "@/lib/tweaks/tweak"
import {saveAs} from "file-saver"
import JSZip from "jszip"

async function addAsset(zip: JSZip, path: string, name: string) {
    const response = await fetch(path)
    const blob = await response.blob()
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
    zip.file(
        "pack.mcmeta",
        JSON.stringify({
            pack: {
                pack_format: 46,
                description: "Made with https://faithfultweaks.io/",
            },
        }),
    )
    const blob = await zip.generateAsync({type: "blob"})
    saveAs(blob, "faithful-tweaks.zip")
}
