import {isDownloadDialogOpen} from "@/components/download-dialog"
import {isSettingsDialogOpen, default as Settings} from "@/components/settings-dialog"
import {isShareDialogOpen} from "@/components/share-dialog"
import {Button} from "@/components/ui/button"
import {SearchBox} from "@/components/ui/searchbox"
import {SidebarTrigger} from "@/components/ui/sidebar"
import {Spinner} from "@/components/ui/spinner"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {search} from "@/lib/state"
import {Packager} from "@/lib/tweaks/packager"
import {BASE_URL, cn} from "@/lib/utils"
import {SiGithub} from "@icons-pack/react-simple-icons"
import {batch, useSignal} from "@preact/signals-react"
import {useWindowScroll} from "@uidotdev/usehooks"
import {saveAs} from "file-saver"
import {DownloadIcon, SettingsIcon, Share2Icon} from "lucide-react"

const splashes = ["Zoglin!?", "Unofficial", "Star Us", "Follow Us"]

function HeaderStart() {
    return (
        <div className="flex items-center gap-2 justify-self-start">
            <SidebarTrigger />
            <div className="relative h-8 justify-self-center">
                <img
                    srcSet={`${BASE_URL}/minecraft_title.png`}
                    className="h-full"
                    alt="Faithful Tweaks (Unofficial) logo"
                    title="Faithful Tweaks (Unofficial)"
                />
                <span className="absolute -right-2 -bottom-2 -rotate-20 animate-[splash_1s_ease-in-out_infinite] text-[10px] font-semibold text-amber-300">
                    {splashes[Math.floor(Math.random() * splashes.length)]}
                </span>
            </div>
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
            onClear={() => {
                search.value = ""
            }}
        />
    )
}

function HeaderEnd() {
    const isDownloading = useSignal(false)
    async function onDownload() {
        if (isDownloading.value) return
        isDownloading.value = true
        const packager = new Packager()
        await packager.package()
        const blob = await packager.zip.generateAsync({type: "blob"})
        saveAs(blob, "faithful-tweaks.zip")
        batch(() => {
            isDownloading.value = false
            isDownloadDialogOpen.value = true
        })
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
                    <Button
                        size="icon"
                        className="size-7"
                        onClick={onDownload}
                        disabled={isDownloading.value}
                    >
                        {isDownloading.value ?
                            <Spinner size="small" className="text-black" />
                        :   <DownloadIcon />}
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
