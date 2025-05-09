import {BaseShareDialog} from "@/components/base-share-dialog"
import {setSignal} from "@/lib/utils"
import {signal} from "@preact/signals-react"

export const isDownloadDialogOpen = signal(false)

export default function DownloadDialog() {
    return (
        <BaseShareDialog
            isOpen={isDownloadDialogOpen.value}
            onOpenChange={setSignal(isDownloadDialogOpen)}
            title="Download Faithful Tweaks"
            description="Thank you for downloading Faithful Tweaks! Before you leave, consider sharing with your friends."
            utmCampaign="download"
        />
    )
}
