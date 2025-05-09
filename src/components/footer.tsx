import Link from "@/components/ui/link"

export default function Footer() {
    return (
        <div className="grid place-items-center gap-2 pb-6">
            <span>
                We ❤️ <Link href="https://vanillatweaks.net/">Vanilla Tweaks</Link>
                <span className="font-semibold"> + </span>
                <Link href="https://faithfulpack.net/">Faithful</Link>
            </span>
        </div>
    )
}
