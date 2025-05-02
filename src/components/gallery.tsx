import data from "@/assets/data.json"
import Tweak from "@/components/tweak"
import {search} from "@/lib/state"

export default function Gallery() {
    const query = search.value.trim().toLowerCase()
    return (
        <div className="flex flex-col gap-2 p-2 pt-0">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-2">
                {Object.values(data.tweaks).map(
                    (tweak) =>
                        (query === ""
                            || tweak.manifest.title.toLowerCase().includes(query)) && (
                            <Tweak key={tweak.manifest.id} manifest={tweak.manifest} />
                        ),
                )}
            </div>
        </div>
    )
}
