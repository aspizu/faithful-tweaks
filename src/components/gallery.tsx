import data from "@/assets/data.json"
import CustomMenuBackgroundTweak from "@/components/custom-tweaks/custom-menu-background-tweak"
import Tweak from "@/components/tweak"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {search} from "@/lib/state"

export default function Gallery() {
    const query = search.value.trim().toLowerCase()
    const filtered = Object.values(data.tweaks).filter((tweak) =>
        tweak.manifest.title.toLowerCase().includes(query),
    )
    const categories = Object.groupBy(filtered, (tweak) => {
        return tweak.manifest.category
    })
    return (
        <div className="flex flex-col gap-2 p-2 pt-0">
            <Accordion type="multiple" defaultValue={Object.keys(categories)}>
                <Category name="GUI">
                    <CustomMenuBackgroundTweak />
                </Category>
                {Object.entries(categories).map(([category, tweaks]) => (
                    <Category key={category} name={category}>
                        {tweaks!.map((tweak) => (
                            <Tweak key={tweak.manifest.id} manifest={tweak.manifest} />
                        ))}
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
