import TweakComponent from "@/components/tweak"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {
    isCategorySelected,
    search,
    selectedTweaks,
    setCategorySelection,
} from "@/lib/state"
import {customTweaks, isTweakCustom} from "@/lib/tweaks/custom-tweak"
import {categories, manifests, type Tweak} from "@/lib/tweaks/tweak"
import {titleCase} from "@/lib/utils"
import {CheckCheckIcon} from "lucide-react"

function SelectAllButton({category}: {category: string}) {
    void selectedTweaks.value // signals hack
    const isSelected = isCategorySelected(category)
    function onSelectAll() {
        setCategorySelection(category, !isSelected)
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="secondary"
                    className="absolute top-3.5 right-6 size-6"
                    size="icon"
                    onClick={onSelectAll}
                >
                    <CheckCheckIcon />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {isSelected ? "Deselect All" : "Select All"}
            </TooltipContent>
        </Tooltip>
    )
}

export default function Gallery() {
    const query = search.value.trim().toLowerCase()
    const filtered = manifests.filter((tweak) =>
        tweak.title.toLowerCase().includes(query),
    )
    const categorized = Object.groupBy(filtered, (tweak) => tweak.category)
    return (
        <div className="flex grow flex-col gap-2 p-2 pt-0">
            <Accordion type="multiple" defaultValue={[categories[0]]}>
                {Object.entries(categorized).map(([category, tweaks]) => (
                    <AccordionItem key={category} value={category} className="relative">
                        <SelectAllButton category={category} />
                        <AccordionTrigger>{titleCase(category)}</AccordionTrigger>
                        <AccordionContent className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2">
                            {tweaks!.map((tweak) => {
                                if (isTweakCustom(tweak.id)) {
                                    const {Component} = customTweaks[tweak.id]
                                    return <Component key={tweak.id} />
                                }
                                return (
                                    <TweakComponent
                                        key={tweak.id}
                                        {...(tweak as Tweak)}
                                    />
                                )
                            })}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
