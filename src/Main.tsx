import { useEffect, useState } from "react"
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Image,
    Select,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    WrapItem,
} from "@chakra-ui/react"
import "./App.css"
import { useColorMode } from "@chakra-ui/react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import {
    DownloadIcon,
    MoonIcon,
    SunIcon,
    HamburgerIcon,
    DeleteIcon,
} from "@chakra-ui/icons"
import { Tweak } from "./Tweak"
import type { TweakMeta } from "./Tweak"
import { CustomOptionBackground } from "./CustomOptionBackground"

const PACK = ["pack.png", "LICENSE.txt"]

export type Variant = "x32" | "x64"

interface Data {
    tweaks: {
        [name: string]: {
            meta: TweakMeta
            files: string[]
        }
    }
}

export function Main() {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState<Data>({
        tweaks: {},
    })
    const [variant, setVariant] = useState<Variant>("x32")
    const [selected, setSelected] = useState<{ [name: string]: boolean }>({})
    const [selectedCustomOptionBackground, setSelectedCustomOptionBackground] =
        useState<string | null>(null)
    async function getData() {
        const index: { [path: string]: string[] } = await (
            await fetch("tweaks/index.json")
        ).json()
        let data: Data = { tweaks: {} }
        for (const [name, files] of Object.entries(index)) {
            const meta: TweakMeta = await (
                await fetch(`tweaks/${name}/tweak.json`)
            ).json()
            data.tweaks[name] = {
                meta: meta,
                files: files,
            }
        }
        setData(data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Flex
                alignItems="center"
                bg={useColorModeValue("gray.100", "gray.900")}
                p={4}
                gap={4}>
                <Image
                    h={12}
                    src="https://raw.githubusercontent.com/Faithful-Resource-Pack/Branding/main/wordmarks/default/cracked/faithful_tweaks.png"
                />
                <div style={{ flexGrow: "1" }} />
                <Flex gap={4}>
                    <Button onClick={toggleColorMode} variant="ghost">
                        {colorMode == "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    <Button variant="ghost" onClick={onOpen}>
                        <HamburgerIcon />
                    </Button>
                    <Select
                        onChange={(ev) => {
                            const variant: Variant =
                                ev.target.value == "x32" ? "x32" : "x64"
                            setVariant(variant)
                            const newSelected = { ...selected }
                            for (const [name, _] of Object.entries(selected)) {
                                const isSupported =
                                    data.tweaks[name].meta.variants.indexOf(
                                        variant,
                                    ) == 0
                                if (!isSupported) {
                                    newSelected[name] = false
                                }
                            }
                            setSelected(newSelected)
                        }}>
                        <option value="x32">Faithful x32</option>
                        <option value="x64">Faithful x64</option>
                    </Select>
                    <WrapItem>
                        <Button
                            colorScheme="cyan"
                            rightIcon={<DownloadIcon />}
                            onClick={() =>
                                build(
                                    data,
                                    variant,
                                    Object.entries(selected)
                                        .filter(([_, isSelected]) => isSelected)
                                        .map(([name, _]) => name),
                                    selectedCustomOptionBackground,
                                )
                            }>
                            Download
                        </Button>
                    </WrapItem>
                </Flex>
            </Flex>
            <Accordion allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                            Misc
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <SimpleGrid minChildWidth={300} spacing={4}>
                            <CustomOptionBackground
                                variant={variant}
                                selected={selectedCustomOptionBackground}
                                onSelectedChange={
                                    setSelectedCustomOptionBackground
                                }
                            />
                        </SimpleGrid>
                    </AccordionPanel>
                </AccordionItem>
                {["aesthetic"].map((category) => (
                    <AccordionItem>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {category}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <SimpleGrid minChildWidth={300} spacing={4}>
                                {Object.entries(data.tweaks)
                                    .filter(
                                        ([_, tweak]) =>
                                            tweak.meta.category == category,
                                    )
                                    .map(([name, tweak]) => (
                                        <Tweak
                                            key={name}
                                            variant={variant}
                                            name={name}
                                            meta={tweak.meta}
                                            isSelected={selected[name]}
                                            onIsSelectedChange={(isSelected) =>
                                                setSelected({
                                                    ...selected,
                                                    [name]: isSelected,
                                                })
                                            }
                                        />
                                    ))}
                            </SimpleGrid>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Selected Tweaks</DrawerHeader>
                    <DrawerBody>
                        <Flex direction="column" height="100%">
                            <Stack gap={2}>
                                {selectedCustomOptionBackground && (
                                    <Flex alignItems="center">
                                        <Text flexGrow={1}>
                                            Custom Options Background (
                                            {selectedCustomOptionBackground})
                                        </Text>
                                        <IconButton
                                            size="sm"
                                            aria-label="Remove"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectedCustomOptionBackground(
                                                    null,
                                                )
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Flex>
                                )}
                                {Object.entries(selected)
                                    .filter(([_, isSelected]) => isSelected)
                                    .map(([name, _]) => (
                                        <Flex alignItems="center">
                                            <Text flexGrow={1}>
                                                {data.tweaks[name].meta.title}
                                            </Text>
                                            <IconButton
                                                size="sm"
                                                aria-label="Remove"
                                                variant="ghost"
                                                onClick={() => {
                                                    setSelected({
                                                        ...selected,
                                                        [name]: false,
                                                    })
                                                }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Flex>
                                    ))}
                            </Stack>
                            <div style={{ flexGrow: "1" }} />
                            {selectedCustomOptionBackground != null ||
                            Object.entries(selected)
                                .map(([_, isSelected]) => +isSelected)
                                .reduce((acc, i) => acc + i, 0) > 0 ? (
                                <Button
                                    rightIcon={<DeleteIcon />}
                                    colorScheme="red"
                                    onClick={() => {
                                        setSelectedCustomOptionBackground(null)
                                        setSelected(
                                            Object.fromEntries(
                                                Object.entries(selected).map(
                                                    ([name, _]) => [
                                                        name,
                                                        false,
                                                    ],
                                                ),
                                            ),
                                        )
                                    }}>
                                    Remove All
                                </Button>
                            ) : null}
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

async function build(
    data: Data,
    variant: Variant,
    tweaks: string[],
    customOptionBackground: string | null,
) {
    const zip = new JSZip()
    if (customOptionBackground) {
        const src = `/${variant}/assets/minecraft/textures/block/${customOptionBackground}.png`
        zip.file(
            "/assets/minecraft/textures/gui/options_background.png",
            await (await fetch(src)).blob(),
        )
    }
    for (const name of tweaks) {
        for (const file of data.tweaks[name].files) {
            const src = `/tweaks/${name}/${variant}/assets/${file}`
            zip.file(`/assets/${file}`, await (await fetch(src)).blob())
        }
    }
    for (const file of PACK) {
        zip.file(file, await (await fetch(`/pack/${file}`)).blob())
    }
    const meta = {
        pack: {
            pack_format: 18,
            description: `Faithful Tweaks for Faithful ${variant}.`,
        },
    }
    zip.file("pack.mcmeta", JSON.stringify(meta))
    const blob = await zip.generateAsync({ type: "blob" })
    saveAs(blob, "faithful-tweaks.zip")
}

/*
export function _Main() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [data, setData] = useState<Data>({
        tweaks: {},
    })
    const [state, setState] = useState<State>({
        variant: "x32",
        tweaks: {},
    })
    useEffect(() => {
        async function getData() {
            const index = await (await fetch("tweaks/index.json")).json()
            let data: Data = { tweaks: {} }
            for (const [name, files] of Object.entries(index)) {
                const meta = await (
                    await fetch(`tweaks/${name}/tweak.json`)
                ).json()
                data.tweaks[name] = {
                    ...meta,
                    files: files,
                }
                state.tweaks[name] = {
                    selected: false,
                }
            }
            setData(data)
            setState(state)
        }
        getData()
    }, [])
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")}>
                <Flex p={4} alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" gap={4}>
                        <WrapItem>
                            <Button
                                colorScheme="teal"
                                onClick={async () => {
                                    const zip = new JSZip()
                                    for (const [name, tweak] of Object.entries(
                                        state.tweaks,
                                    )) {
                                        if (!tweak.selected) {
                                            continue
                                        }
                                        for (const file of data.tweaks[name]
                                            .files) {
                                            const src = `/tweaks/${name}/${state.variant}/assets/${file}`
                                            zip.file(
                                                `/assets/${file}`,
                                                await (await fetch(src)).blob(),
                                            )
                                        }
                                    }
                                    const blob = await zip.generateAsync({
                                        type: "blob",
                                    })
                                    saveAs(blob, "faithful-tweaks.zip")
                                }}
                                rightIcon={<DownloadIcon />}>
                                {" "}
                                Build{" "}
                            </Button>
                        </WrapItem>
                        <Select
                            onChange={(ev) => {
                                const variant =
                                    ev.target.value == "x32" ? "x32" : "x64"
                                setState({
                                    tweaks: Object.fromEntries(
                                        Object.entries(state.tweaks).map(
                                            ([name, tweak]) => {
                                                const isSupported =
                                                    data.tweaks[
                                                        name
                                                    ].variants.indexOf(variant)
                                                if (!isSupported) {
                                                    return [
                                                        name,
                                                        {
                                                            ...tweak,
                                                            selected: false,
                                                        },
                                                    ]
                                                }
                                                return [name, { ...tweak }]
                                            },
                                        ),
                                    ),
                                    variant: variant,
                                })
                            }}>
                            <option value="x32">Faithful x32</option>
                            <option value="x64">Faithful x64</option>
                        </Select>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode} variant="ghost">
                                {colorMode == "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <Flex direction="column">
                <SimpleGrid minChildWidth="120px" gap={4} padding={4}>
                    {Object.entries(data.tweaks).map(([name, tweak]) => {
                        const isSupported =
                            tweak.variants.indexOf(state.variant) == 0
                        return (
                            <Card
                                key={name}
                                variant={
                                    state.tweaks[name].selected
                                        ? "elevated"
                                        : "outline"
                                }>
                                <CardBody
                                    style={
                                        !isSupported
                                            ? {
                                                  filter: "blur(3px)",
                                                  pointerEvents: "none",
                                                  userSelect: "none",
                                              }
                                            : {}
                                    }>
                                    <Image
                                        src={`/tweaks/${name}/${
                                            isSupported
                                                ? state.variant
                                                : tweak.variants[0]
                                        }/preview.png`}
                                        alt={`Preview of tweak ${name}`}
                                        borderRadius="md"
                                        mb={4}
                                    />
                                    <Flex gap={4} mb={4}>
                                        <Checkbox
                                            colorScheme="teal"
                                            size="lg"
                                            checked={
                                                state.tweaks[name].selected
                                            }
                                            onChange={(ev) => {
                                                setState({
                                                    ...state,
                                                    tweaks: {
                                                        ...state.tweaks,
                                                        [name]: {
                                                            ...state.tweaks[
                                                                name
                                                            ],
                                                            selected:
                                                                ev.target
                                                                    .checked,
                                                        },
                                                    },
                                                })
                                            }}></Checkbox>
                                        <Heading size="md">
                                            {tweak.title}
                                        </Heading>
                                    </Flex>
                                    <Text>{tweak.description}</Text>
                                    {tweak.variants.map((variant) => (
                                        <Badge colorScheme="purple">
                                            {variant}
                                        </Badge>
                                    ))}
                                </CardBody>
                            </Card>
                        )
                    })}
                </SimpleGrid>
            </Flex>
        </>
    )
}*/
