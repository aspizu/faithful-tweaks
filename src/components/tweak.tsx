import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Button} from "@/components/ui/button"
import {Switch} from "@/components/ui/switch"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {pack, setTweakSelection, tweaks} from "@/lib/state"
import {getPackName, Manifest} from "@/lib/tweaks/tweak"
import {cn} from "@/lib/utils"
import {SiDiscord, SiGithub} from "@icons-pack/react-simple-icons"
import {BanIcon, LinkIcon, MailIcon} from "lucide-react"

function UnsupportedAlert() {
    return (
        <Alert className="overlapping-grid-layer w-[75%]">
            <BanIcon className="size-4" />
            <AlertTitle>Not supported for {getPackName(pack.value)}</AlertTitle>
            <AlertDescription className="text-xs">
                Please select a different pack in the settings.
            </AlertDescription>
        </Alert>
    )
}

function Attribution({author}: {author: Manifest["author"]}) {
    return (
        <div className="mt-1 flex flex-wrap items-center gap-1">
            <span className="text-xs font-semibold">@{author.name}</span>
            {author.link && (
                <Button size="icon" variant="ghost" className="size-6" asChild>
                    <a href={author.link} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="size-3" />
                    </a>
                </Button>
            )}
            {author.discord && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="size-6"
                            onClick={() => {
                                navigator.clipboard.writeText(author.discord!)
                            }}
                        >
                            <SiDiscord className="size-3" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{author.discord}</TooltipContent>
                </Tooltip>
            )}
            {author.email && (
                <Button size="icon" variant="ghost" className="size-6" asChild>
                    <a href={`mailto:${author.email}`}>
                        <MailIcon className="size-3" />
                    </a>
                </Button>
            )}
            {author.github && (
                <Button size="icon" variant="ghost" className="size-6" asChild>
                    <a
                        href={`https://github.com/${author.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <SiGithub className="size-3" />
                    </a>
                </Button>
            )}
        </div>
    )
}

export interface TweakProps {
    manifest: Manifest
}

export default function Tweak({
    manifest: {id, title, description, supported, author},
}: TweakProps) {
    const isUnsupported = !supported.includes(pack.value)
    const previewImage =
        isUnsupported ?
            `/tweaks/${id}/${supported[0]}/preview.png`
        :   `/tweaks/${id}/${pack.value}/preview.png`

    return (
        <div className="overlapping-grid place-items-center">
            <div
                className={cn(
                    "overlapping-grid-layer flex h-full w-full flex-col gap-2 rounded-xl border bg-transparent p-2",
                    isUnsupported && "opacity-50",
                )}
            >
                <div className="flex">
                    <div className="mr-auto flex flex-col">
                        <span className="font-semibold">{title}</span>
                        <span
                            className="text-muted-foreground text-xs"
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        ></span>
                        <Attribution author={author} />
                    </div>
                    <Switch
                        disabled={isUnsupported}
                        checked={tweaks.value.includes(id)}
                        onCheckedChange={setTweakSelection(id)}
                    />
                </div>
                <img className="mt-auto aspect-[4/3] rounded-sm" src={previewImage} />
            </div>
            {isUnsupported && <UnsupportedAlert />}
        </div>
    )
}
