import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export const BASE_URL = import.meta.env.BASE_URL?.slice(0, -1) as string

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

export function titleCase(str: string) {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}
