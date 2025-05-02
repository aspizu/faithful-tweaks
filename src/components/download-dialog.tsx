import {BaseShareDialog} from "@/components/base-share-dialog"
import {Badge} from "@/components/ui/badge"
import {setSignal} from "@/lib/utils"
import {signal} from "@preact/signals-react"
import {LinkIcon} from "lucide-react"

export const isDownloadDialogOpen = signal(false)

export default function DownloadDialog() {
    return (
        <BaseShareDialog
            isOpen={isDownloadDialogOpen.value}
            onOpenChange={setSignal(isDownloadDialogOpen)}
            title="Before you leave"
            description="We would appreciate if you share this tool with your friends."
        >
            <Badge variant="outline" asChild>
                <a
                    href="https://github.com/aspizu/faithful-tweaks"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center gap-1"
                >
                    <LinkIcon size={14} />
                    GitHub
                </a>
            </Badge>
            <Badge variant="outline" asChild>
                <a
                    href="https://github.com/aspizu"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center gap-1"
                >
                    <LinkIcon size={14} />
                    Follow
                </a>
            </Badge>
        </BaseShareDialog>
    )
}
