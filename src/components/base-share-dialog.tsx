import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {createShareURL} from "@/lib/share"
import {toast} from "sonner"

interface BaseShareDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    utmCampaign: string
    children?: React.ReactNode
}

export function BaseShareDialog({
    isOpen,
    onOpenChange,
    title,
    description,
    utmCampaign,
    children,
}: BaseShareDialogProps) {
    const shareURL = createShareURL({utmCampaign})

    async function handleShare() {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Faithful Tweaks (Unofficial)",
                    text: "Create your own Minecraft resource pack using Faithful Tweaks.",
                    url: shareURL,
                })
            } else {
                await navigator.clipboard.writeText(shareURL)
                toast.success("Link copied to clipboard!")
            }
        } catch (err) {
            if (!(err instanceof Error) || !err.message.includes("AbortError")) {
                console.error(err)
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <Label className="flex flex-col items-start gap-2">
                    Shareable Link
                    <Input
                        value={shareURL}
                        readOnly
                        onFocus={handleShare}
                        className="cursor-pointer"
                    />
                </Label>
                {children}
            </DialogContent>
        </Dialog>
    )
}
