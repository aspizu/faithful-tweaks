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
import {tweaks} from "@/lib/state"
import {data} from "@/lib/tweaks/tweak"
import {produce} from "immer"
import {XIcon} from "lucide-react"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Selected Tweaks</SidebarGroupLabel>
                        <SidebarMenu>
                            {tweaks.value.map((tweak) => (
                                <SidebarMenuItem key={tweak}>
                                    <SidebarMenuButton>
                                        {data.tweaks[tweak].manifest.title}
                                    </SidebarMenuButton>
                                    <SidebarMenuAction
                                        onClick={() => {
                                            tweaks.value = produce(
                                                tweaks.value,
                                                (tweaks) => {
                                                    const index = tweaks.indexOf(tweak)
                                                    if (index !== -1) {
                                                        tweaks.splice(index, 1)
                                                    }
                                                    tweaks.sort()
                                                },
                                            )
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
