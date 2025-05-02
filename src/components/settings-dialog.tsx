import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {pack, tweaks} from "@/lib/state"
import {data, supported} from "@/lib/tweaks/tweak"
import {plural, setSignal} from "@/lib/utils"
import {signal} from "@preact/signals-react"
import {useId} from "react"
import {toast} from "sonner"

export const isSettingsDialogOpen = signal(false)

export default function SettingsDialog() {
    const id = useId()
    return (
        <Dialog
            open={isSettingsDialogOpen.value}
            onOpenChange={setSignal(isSettingsDialogOpen)}
        >
            <DialogContent className="flex flex-col gap-2">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Configure your preferences below.
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor={id}>Pack</Label>
                <Select
                    value={pack.value}
                    onValueChange={(value) => {
                        const removed = []
                        tweaks.value = tweaks.value.filter((tweak) => {
                            if (data.tweaks[tweak].manifest.supported.includes(value)) {
                                return true
                            }
                            removed.push(tweak)
                            return false
                        })
                        pack.value = value
                        if (removed.length > 0) {
                            toast(
                                `Removed ${removed.length} unsupported ${plural(
                                    removed.length,
                                    "tweak",
                                    "tweaks",
                                )} from your selection.`,
                            )
                        }
                    }}
                >
                    <SelectTrigger id={id} className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {supported.map((pack) => (
                            <SelectItem key={pack.id} value={pack.id}>
                                {pack.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="text-muted-foreground text-xs">
                    Changing the pack will remove unsupported tweaks from your
                    selection.
                </span>
            </DialogContent>
        </Dialog>
    )
}
