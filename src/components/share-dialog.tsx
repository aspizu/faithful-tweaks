import {BaseShareDialog} from "@/components/base-share-dialog"
import {setSignal} from "@/lib/utils"
import {signal} from "@preact/signals-react"

export const isShareDialogOpen = signal(false)

export default function ShareDialog() {
    return (
        <BaseShareDialog
            isOpen={isShareDialogOpen.value}
            onOpenChange={setSignal(isShareDialogOpen)}
            title="Share Your Faithful Tweaks Pack"
            description="Share your selected tweaks and configuration with your friends!"
        />
    )
}
