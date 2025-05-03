import {isDownloadDialogOpen} from "@/components/download-dialog"
import {isSettingsDialogOpen, default as Settings} from "@/components/settings-dialog"
import {isShareDialogOpen} from "@/components/share-dialog"
import {Button} from "@/components/ui/button"
import {SearchBox} from "@/components/ui/searchbox"
import {SidebarTrigger} from "@/components/ui/sidebar"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {search} from "@/lib/state"
import {createPackage} from "@/lib/tweaks/package"
import {BASE_URL, cn} from "@/lib/utils"
import {SiGithub} from "@icons-pack/react-simple-icons"
import {useWindowScroll} from "@uidotdev/usehooks"
import {DownloadIcon, SettingsIcon, Share2Icon} from "lucide-react"

function HeaderStart() {
    return (
        <div className="flex items-center gap-2 justify-self-start">
            <SidebarTrigger className="mr-auto" />
            <img
                srcSet={`${BASE_URL}/title_1x.png 1x, ${BASE_URL}/title_2x.png 2x`}
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
    async function onDownload() {
        await createPackage()
        isDownloadDialogOpen.value = true
    }

    return (
        <div className="flex items-center gap-2 justify-self-end">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="size-7" variant="ghost" asChild>
                        <a
                            href="https://github.com/aspizu/faithful-tweaks"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <SiGithub />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        className="size-7"
                        variant="ghost"
                        onClick={() => {
                            isSettingsDialogOpen.value = true
                        }}
                    >
                        <SettingsIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Settings />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        className="size-7"
                        variant="ghost"
                        onClick={() => {
                            isShareDialogOpen.value = true
                        }}
                    >
                        <Share2Icon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" className="size-7" onClick={onDownload}>
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
                "sticky top-0 z-1 grid grid-cols-[2fr_3fr_2fr] items-center p-2",
                scroll.y
                    && scroll.y > 0
                    && "bg-background/95 border-b border-dashed shadow-lg backdrop-blur",
            )}
        >
            <HeaderStart />
            <HeaderCenter />
            <HeaderEnd />
        </header>
    )
}
