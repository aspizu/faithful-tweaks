import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import type {TweakAuthor} from "@/lib/tweaks/tweak"
import {SiDiscord, SiGithub} from "@icons-pack/react-simple-icons"
import {LinkIcon, MailIcon} from "lucide-react"

export default function TweakAuthor({name, link, discord, email, github}: TweakAuthor) {
    return (
        <div className="mt-1 flex flex-wrap items-center gap-1">
            <span className="text-xs font-semibold">@{name}</span>
            {link && (
                <Button size="icon" variant="ghost" className="size-6" asChild>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="size-3" />
                    </a>
                </Button>
            )}
            {discord && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="size-6"
                            onClick={() => {
                                navigator.clipboard.writeText(discord!)
                            }}
                        >
                            <SiDiscord className="size-3" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{discord}</TooltipContent>
                </Tooltip>
            )}
            {email && (
                <Button size="icon" variant="ghost" className="size-6" asChild>
                    <a href={`mailto:${email}`}>
                        <MailIcon className="size-3" />
                    </a>
                </Button>
            )}
            {github && (
                <Button size="icon" variant="ghost" className="size-6" asChild>
                    <a
                        href={`https://github.com/${github}`}
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
