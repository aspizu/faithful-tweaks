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
import {manifests} from "@/lib/tweaks/tweak"
import {XIcon} from "lucide-react"

function SelectedTweaksMenu() {
    return manifests
        .filter(({id}) => selectedTweaks.value.has(id))
        .map(({id, title}) => (
            <SidebarMenuItem key={id}>
                <SidebarMenuButton title={title}>{title}</SidebarMenuButton>
                <SidebarMenuAction
                    onClick={() => {
                        setTweakSelection(id, false)
                    }}
                >
                    <XIcon />
                </SidebarMenuAction>
            </SidebarMenuItem>
        ))
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
