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
import {selectedPack} from "@/lib/state"
import {packs} from "@/lib/tweaks/tweak"
import {setSignal} from "@/lib/utils"
import {signal} from "@preact/signals-react"
import {useId} from "react"

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
                    value={selectedPack.value}
                    onValueChange={setSignal(selectedPack)} // TODO: Remove unsupported tweaks
                >
                    <SelectTrigger id={id} className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(packs).map(([id, {name}]) => (
                            <SelectItem key={id} value={id}>
                                {name}
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
