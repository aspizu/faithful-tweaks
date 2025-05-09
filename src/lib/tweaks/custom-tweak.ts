import {Category, PackID, TweakAuthor, TweakID} from "@/lib/tweaks/tweak"

import * as CustomOptionsBackground from "@/lib/tweaks/custom-tweaks/custom-options-background"

export const customTweaks = {
    "custom-options-background": CustomOptionsBackground,
}

export interface Manifest {
    id: TweakID
    category: Category
    title: string
    description: string
    author: TweakAuthor
    isNew: boolean
    packsSupported: PackID[]
}

export function isTweakCustom(id: TweakID): id is keyof typeof customTweaks {
    return id in customTweaks
}
