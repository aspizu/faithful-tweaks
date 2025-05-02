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
import {setTweakSelection, tweaks} from "@/lib/state"
import {customTweaks, data} from "@/lib/tweaks/tweak"
import {XIcon} from "lucide-react"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Selected Tweaks</SidebarGroupLabel>
                        <SidebarMenu>
                            {tweaks.value
                                .filter((tweak) => tweak.startsWith("custom-"))
                                .map((tweak) => (
                                    <SidebarMenuItem key={tweak}>
                                        <SidebarMenuButton>
                                            {customTweaks[tweak].title}
                                        </SidebarMenuButton>
                                        <SidebarMenuAction
                                            onClick={() => {
                                                setTweakSelection(tweak)(false)
                                            }}
                                        >
                                            <XIcon />
                                        </SidebarMenuAction>
                                    </SidebarMenuItem>
                                ))}
                            {tweaks.value
                                .filter((tweak) => !tweak.startsWith("custom-"))
                                .map((tweak) => (
                                    <SidebarMenuItem key={tweak}>
                                        <SidebarMenuButton>
                                            {data.tweaks[tweak].manifest.title}
                                        </SidebarMenuButton>
                                        <SidebarMenuAction
                                            onClick={() => {
                                                setTweakSelection(tweak)(false)
                                            }}
                                        >
                                            <XIcon />
                                        </SidebarMenuAction>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
