import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function setSignal<T>(signal: {value: T}) {
    return (value: T) => {
        signal.value = value
    }
}

export function plural(value: number, singular: string, plural: string) {
    return value === 1 ? singular : plural
}

export const BASE_URL = import.meta.env.BASE_URL?.slice(0, -1) as string

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const cache: Record<string, Blob> = {}

export async function cfetch(url: string, options?: RequestInit): Promise<Blob> {
    if (cache[url]) {
        return Promise.resolve(cache[url])
    }
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
    }
    cache[url] = await response.blob()
    return cache[url]
}
