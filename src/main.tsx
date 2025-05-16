import App from "@/components/app"
import DownloadDialog from "@/components/download-dialog"
import ShareDialog from "@/components/share-dialog"
import {Toaster} from "@/components/ui/sonner"
import {loadShareURL} from "@/lib/share"
import {enableMapSet} from "immer"
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
// @ts-ignore
import "@fontsource-variable/inter"

enableMapSet()

loadShareURL()

const root = createRoot(document.getElementById("root") as HTMLDivElement)

root.render(
    <StrictMode>
        <App />
        <DownloadDialog />
        <ShareDialog />
        <Toaster />
    </StrictMode>,
)
