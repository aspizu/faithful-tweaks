/* eslint-disable ban-relative-imports/ban-relative-imports */
import Bun from "bun"
import fs from "fs/promises"
import path from "path"
import type {Tweak} from "./src/lib/tweaks/tweak.ts"

async function listDirectories(basePath: string): Promise<string[]> {
    const entries = await fs.readdir(basePath)
    const dirs = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(basePath, entry)
            return (await fs.stat(fullPath)).isDirectory() ? fullPath : null
        }),
    )
    return dirs.filter(Boolean) as string[]
}

const tweaks: Record<string, Tweak> = {}
const conflicts: {id: string; tweaks: string[]; files: string[]}[] = []

const tweakDirectories = await listDirectories(
    path.join(process.cwd(), "public/tweaks"),
)

for (const tweakDirectory of tweakDirectories) {
    const manifest = await Bun.file(path.join(tweakDirectory, "tweak.json")).json()
    const packsSupported = (await listDirectories(tweakDirectory)).map((directory) =>
        path.relative(tweakDirectory, directory),
    )
    const files = (
        await Array.fromAsync(
            new Bun.Glob("**/*").scan({
                cwd: path.join(tweakDirectory, packsSupported[0]),
            }),
        )
    ).filter((file) => file !== "preview.avif")
    tweaks[path.basename(tweakDirectory)] = {
        index: manifest.index,
        id: path.basename(tweakDirectory),
        category: manifest.category,
        title: manifest.title,
        description: manifest.description,
        author: manifest.author,
        isNew: manifest.new ?? false,
        files: files.map((file) => file.replaceAll("\\", "/")),
        packsSupported: packsSupported as any,
    }
}

const conflictDirectories = await listDirectories(
    path.join(process.cwd(), "public/conflicts"),
)

for (const conflictDirectory of conflictDirectories) {
    const tweakList = path.basename(conflictDirectory).split("+")
    conflicts.push({
        id: path.basename(conflictDirectory),
        tweaks: tweakList,
        files: await Array.fromAsync(
            new Bun.Glob("**/*").scan({cwd: conflictDirectory}),
        ),
    })
}

await Bun.file(path.join(process.cwd(), "src/assets/tweaks.json")).write(
    JSON.stringify(tweaks),
)

await Bun.file(path.join(process.cwd(), "src/assets/conflicts.json")).write(
    JSON.stringify(conflicts),
)
