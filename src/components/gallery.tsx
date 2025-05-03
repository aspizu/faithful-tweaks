import data from "@/assets/data.json"
import CustomOptionsBackgroundTweak from "@/components/custom-tweaks/custom-options-background-tweak"
import CustomPeaceAndQuietTweak from "@/components/custom-tweaks/custom-peace-and-quiet-tweak"
import Tweak from "@/components/tweak"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {search} from "@/lib/state"
import {customTweaks, Manifest} from "@/lib/tweaks/tweak"

export default function Gallery() {
    const query = search.value.trim().toLowerCase()
    const filtered = [
        ...Object.values(data.tweaks),
        ...Object.values(customTweaks),
    ].filter((tweak) => tweak.manifest.title.toLowerCase().includes(query))
    const categories = Object.groupBy(filtered, (tweak) => {
        return tweak.manifest.category
    })
    return (
        <div className="flex grow flex-col gap-2 p-2 pt-0">
            <Accordion
                type="multiple"
                defaultValue={["custom", ...Object.keys(categories)]}
            >
                {Object.entries(categories).map(([category, tweaks]) => (
                    <Category key={category} name={category}>
                        {tweaks!.map((tweak) =>
                            tweak.manifest.id === "custom-options-background" ?
                                <CustomOptionsBackgroundTweak key="custom-options-background" />
                            : tweak.manifest.id === "custom-peace-and-quiet" ?
                                <CustomPeaceAndQuietTweak key="custom-peace-and-quiet" />
                            :   <Tweak
                                    key={tweak.manifest.id}
                                    manifest={tweak.manifest as Manifest}
                                />,
                        )}
                    </Category>
                ))}
            </Accordion>
        </div>
    )
}

function Category({name, children}: {name: string; children: any}) {
    return (
        <AccordionItem value={name}>
            <AccordionTrigger>
                {name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2">
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}
