import {pack, tweaks} from "@/lib/state"
import {data} from "@/lib/tweaks/tweak"
import {saveAs} from "file-saver"
import JSZip from "jszip"

export async function createPackage() {
    const resolved: string[] = []
    const zip = new JSZip()
    async function addAsset(path: string, name: string) {
        const response = await fetch(path)
        const blob = await response.blob()
        zip.file(name, blob)
    }
    for (const [conflictId, conflict] of Object.entries(data.conflicts)) {
        if (conflict.tweaks.every((tweakId) => tweaks.value.includes(tweakId))) {
            resolved.push(...conflict.tweaks)
            for (const file of conflict.files) {
                await addAsset(
                    `/public/conflicts/${conflictId}/${pack.value}/${file}`,
                    file,
                )
            }
        }
    }
    for (const tweakId of tweaks.value) {
        if (resolved.includes(tweakId)) continue
        resolved.push(tweakId)
        const {files} = data.tweaks[tweakId]
        for (const file of files) {
            if (file === "preview.png") continue
            await addAsset(`/public/tweaks/${tweakId}/${pack.value}/${file}`, file)
        }
    }
    zip.file(
        "pack.mcmeta",
        JSON.stringify({
            pack: {
                pack_format: 18,
                description: "Made with https://faithfultweaks.io/",
            },
        }),
    )
    const blob = await zip.generateAsync({type: "blob"})
    saveAs(blob, "faithful-tweaks.zip")
}
