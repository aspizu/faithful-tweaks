import {cfetch} from "@/lib/cfetch"
import {selectedPack, selectedTweaks} from "@/lib/state"
import {customTweaks, isTweakCustom} from "@/lib/tweaks/custom-tweak"
import {TweakID, tweaks} from "@/lib/tweaks/tweak"
import {BASE_URL} from "@/lib/utils"
import JSZip from "jszip"

export async function cacheTweak(id: TweakID) {
    await Promise.all(tweaks[id].files.map((file) => cfetch(file)))
}

export class Packager {
    zip: JSZip

    constructor() {
        this.zip = new JSZip()
    }

    async package() {
        await this.addAllSelectedTweaks()
        await this.addLicenses()
        this.addMeta()
    }

    getMeta() {
        return {
            pack: {
                pack_format: 55,
                description: `Made with ${location.origin}`,
            },
        }
    }

    addMeta() {
        this.zip.file("pack.mcmeta", JSON.stringify(this.getMeta(), null, 2))
    }

    async addAllSelectedTweaks() {
        for (const tweakID of selectedTweaks.value) {
            if (isTweakCustom(tweakID)) {
                await customTweaks[tweakID].logic(this)
            } else {
                await this.addTweak(tweakID)
            }
        }
    }

    async addLicenses() {
        await this.addAsset("/credits.txt", "credits.txt")
        await this.addAsset("/LICENSE.txt", "LICENSE.txt")
    }

    async addTweak(tweakID: TweakID) {
        const tweak = tweaks[tweakID]
        for (const file of tweak.files) {
            await this.addAsset(
                `/tweaks/${tweakID}/${selectedPack.value}/${file}`,
                file,
            )
        }
    }

    async addAsset(url: string, name: string) {
        this.zip.file(name, await cfetch(BASE_URL + url))
    }
}
