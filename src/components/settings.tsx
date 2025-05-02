import {Label} from "@/components/ui/label"
import {PopoverContent} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {pack, tweaks} from "@/lib/state"
import {data, supported} from "@/lib/tweaks/tweak"
import {plural} from "@/lib/utils"
import {useId} from "react"
import {toast} from "sonner"

export default function Settings() {
    const id = useId()
    return (
        <PopoverContent className="flex flex-col gap-2">
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
                Changing the pack will remove unsupported tweaks from your selection.
            </span>
        </PopoverContent>
    )
}
