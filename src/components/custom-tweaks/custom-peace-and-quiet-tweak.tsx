import CustomTweak from "@/components/custom-tweaks/custom-tweak"
import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label"
import {customPeaceAndQuietSelection, setTweakSelection, tweaks} from "@/lib/state"
import {customPeaceAndQuiet} from "@/lib/tweaks/tweak"
import {produce} from "immer"

export default function CustomPeaceAndQuietTweak() {
    const isSelected = tweaks.value.includes("custom-peace-and-quiet")
    return (
        <CustomTweak id="custom-peace-and-quiet">
            {Object.entries(customPeaceAndQuiet).map(([_id, {name}]) => {
                const id = _id as keyof typeof customPeaceAndQuiet
                return (
                    <Label>
                        <Checkbox
                            checked={
                                isSelected
                                && (customPeaceAndQuietSelection.value[id] ?? false)
                            }
                            onCheckedChange={(value) => {
                                customPeaceAndQuietSelection.value = produce(
                                    customPeaceAndQuietSelection.value,
                                    (draft) => {
                                        if (value) {
                                            setTweakSelection("custom-peace-and-quiet")(
                                                true,
                                            )
                                            draft[id] = true
                                        } else {
                                            draft[id] = false
                                        }
                                    },
                                )
                            }}
                        />
                        Quieter {name}
                    </Label>
                )
            })}
        </CustomTweak>
    )
}
