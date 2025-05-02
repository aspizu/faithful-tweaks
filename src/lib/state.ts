import {supported} from "@/lib/tweaks/tweak"
import {signal} from "@preact/signals-react"

export const pack = signal<string>(supported[0].id)

export const tweaks = signal<string[]>([])

export const search = signal<string>("")
