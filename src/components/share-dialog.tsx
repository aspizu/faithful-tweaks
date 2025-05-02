import {BaseShareDialog} from "@/components/base-share-dialog"
import {setSignal} from "@/lib/utils"
import {signal} from "@preact/signals-react"
import {Share2Icon} from "lucide-react"

export const isShareDialogOpen = signal(false)

export function ShareButton() {
    return (
        <button
            onClick={() => (isShareDialogOpen.value = true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 transition-colors"
        >
            <Share2Icon size={16} />
            Share
        </button>
    )
}

export default function ShareDialog() {
    return (
        <BaseShareDialog
            isOpen={isShareDialogOpen.value}
            onOpenChange={setSignal(isShareDialogOpen)}
            title="Share this resource pack"
            description="Spread the word about this tool with your friends and community."
        />
    )
}
