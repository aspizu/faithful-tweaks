import Settings from "@/components/settings"
import {Button} from "@/components/ui/button"
import {Popover, PopoverTrigger} from "@/components/ui/popover"
import {SearchBox} from "@/components/ui/searchbox"
import {SidebarTrigger} from "@/components/ui/sidebar"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {search} from "@/lib/state"
import {createPackage} from "@/lib/tweaks/package"
import {cn} from "@/lib/utils"
import {useWindowScroll} from "@uidotdev/usehooks"
import {DownloadIcon, SettingsIcon, Share2Icon} from "lucide-react"

function HeaderStart() {
    return (
        <div className="flex items-center gap-2 justify-self-start">
            <SidebarTrigger className="mr-auto" />
            <img
                srcSet="/public/title_1x.png 1x, /public/title_2x.png 2x"
                className="justify-self-center"
                alt="Faithful Tweaks"
            />
        </div>
    )
}

function HeaderCenter() {
    return (
        <SearchBox
            value={search.value}
            onChange={(ev) => {
                search.value = ev.target.value
            }}
        />
    )
}

function HeaderEnd() {
    return (
        <div className="flex items-center gap-2 justify-self-end">
            <Popover>
                <Tooltip>
                    <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button size="icon" className="size-7" variant="ghost">
                                <SettingsIcon />
                            </Button>
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent>Settings</TooltipContent>
                </Tooltip>
                <Settings />
            </Popover>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="size-7" variant="ghost">
                        <Share2Icon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="size-7" onClick={createPackage}>
                        <DownloadIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Download</TooltipContent>
            </Tooltip>
        </div>
    )
}

export default function Header() {
    const [scroll] = useWindowScroll()
    return (
        <header
            className={cn(
                "bg-background/95 sticky top-0 z-1 grid grid-cols-[2fr_3fr_2fr] items-center p-2 shadow-lg backdrop-blur",
                scroll.y && scroll.y > 0 && "border-b border-dashed",
            )}
        >
            <HeaderStart />
            <HeaderCenter />
            <HeaderEnd />
        </header>
    )
}
