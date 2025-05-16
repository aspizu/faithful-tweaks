import tweaks from "@/assets/tweaks.json"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {selectedTweaks, setTweakSelection} from "@/lib/state"
import {customTweaks, isTweakCustom} from "@/lib/tweaks/custom-tweak"
import {XIcon} from "lucide-react"

function SelectedTweaksMenu() {
    return selectedTweaks.value
        .values()
        .map((tweak) => (
            <SidebarMenuItem key={tweak}>
                <SidebarMenuButton>
                    {isTweakCustom(tweak) ?
                        customTweaks[tweak].manifest.title
                    :   tweaks[tweak].title}
                </SidebarMenuButton>
                <SidebarMenuAction
                    onClick={() => {
                        setTweakSelection(tweak, false)
                    }}
                >
                    <XIcon />
                </SidebarMenuAction>
            </SidebarMenuItem>
        ))
        .toArray()
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Selected Tweaks</SidebarGroupLabel>
                        <SidebarMenu>
                            <SelectedTweaksMenu />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
