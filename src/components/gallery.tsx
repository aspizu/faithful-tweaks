import Tweak from "@/components/tweak"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {search} from "@/lib/state"
import {customTweaks, isTweakCustom} from "@/lib/tweaks/custom-tweak"
import {categories, tweaks} from "@/lib/tweaks/tweak"
import {titleCase} from "@/lib/utils"

export default function Gallery() {
    const query = search.value.trim().toLowerCase()
    const filtered = Object.values(tweaks)
        .concat(Object.values(customTweaks).map((tweak) => tweak.manifest) as any)
        .filter((tweak) => tweak.title.toLowerCase().includes(query))
    const categorized = Object.groupBy(filtered, (tweak) => tweak.category)
    return (
        <div className="flex grow flex-col gap-2 p-2 pt-0">
            <Accordion type="multiple" defaultValue={[categories[0]]}>
                {Object.entries(categorized).map(([category, tweaks]) => (
                    <AccordionItem key={category} value={category}>
                        <AccordionTrigger>{titleCase(category)}</AccordionTrigger>
                        <AccordionContent className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2">
                            {tweaks!.map((tweak) => {
                                if (isTweakCustom(tweak.id)) {
                                    const {Component} = customTweaks[tweak.id]
                                    return <Component key={tweak.id} />
                                }
                                return <Tweak key={tweak.id} {...tweak} />
                            })}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
