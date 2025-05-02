import App from "@/components/app"
import {Toaster} from "@/components/ui/sonner"
import {enableMapSet} from "immer"
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"

enableMapSet()

const root = createRoot(document.getElementById("root") as HTMLDivElement)

root.render(
    <StrictMode>
        <App />
        <Toaster />
    </StrictMode>,
)
