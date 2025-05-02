import Bun from "bun"
import fs from "fs/promises"
import path from "path"

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

const data = {
    tweaks: {},
    conflicts: {},
}

const tweakDirectories = await listDirectories(
    path.join(process.cwd(), "public/tweaks"),
)

for (const tweakDirectory of tweakDirectories) {
    const manifest = await Bun.file(path.join(tweakDirectory, "tweak.json")).json()
    const supported = (await listDirectories(tweakDirectory)).map((directory) =>
        path.relative(tweakDirectory, directory),
    )
    const files = await Array.fromAsync(
        new Bun.Glob("**/*").scan({cwd: path.join(tweakDirectory, supported[0])}),
    )
    data.tweaks[path.basename(tweakDirectory)] = {
        files: files.map((file) => file.replaceAll("\\", "/")),
        manifest: {
            id: path.basename(tweakDirectory),
            ...manifest,
            supported,
        },
    }
}

const conflictDirectories = await listDirectories(
    path.join(process.cwd(), "public/conflicts"),
)

for (const conflictDirectory of conflictDirectories) {
    const tweakList = path.basename(conflictDirectory).split("+")
    tweakList.sort()
    const conflictHash = tweakList.join("+")
    data.conflicts[conflictHash] = {
        tweaks: tweakList,
        files: await Array.fromAsync(
            new Bun.Glob("**/*").scan({cwd: conflictDirectory}),
        ),
    }
}

await Bun.file(path.join(process.cwd(), "src/assets/data.json")).write(
    JSON.stringify(data),
)
