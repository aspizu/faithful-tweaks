import {AppSidebar} from "@/components/app-sidebar"
import Gallery from "@/components/gallery"
import Header from "@/components/header"
import {SidebarProvider} from "@/components/ui/sidebar"

export default function App() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="grow">
                <Header />
                <Gallery />
            </main>
        </SidebarProvider>
    )
}
