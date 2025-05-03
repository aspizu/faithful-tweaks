import {AppSidebar} from "@/components/app-sidebar"
import Footer from "@/components/footer"
import Gallery from "@/components/gallery"
import Header from "@/components/header"
import {SidebarProvider} from "@/components/ui/sidebar"

export default function App() {
    return (
        <SidebarProvider className="grow">
            <AppSidebar />
            <main className="grow">
                <Header />
                <Gallery />
                <Footer />
            </main>
        </SidebarProvider>
    )
}
