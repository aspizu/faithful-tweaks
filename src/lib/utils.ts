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

export const BASE_URL = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL

console.log("import.meta.env.BASE_URL =", import.meta.env.BASE_URL)
