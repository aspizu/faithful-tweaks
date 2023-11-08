import { CloseIcon } from "@chakra-ui/icons"
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    SimpleGrid,
    Image,
    Input,
    Flex,
    InputGroup,
    InputRightElement,
    Button,
} from "@chakra-ui/react"
import { useState } from "react"
import { Variant } from "./Main"

interface CustomOptionBackgroundProps {
    variant: Variant
    selected: string | null
    onSelectedChange: (selected: string | null) => void
}

export function CustomOptionBackground(props: CustomOptionBackgroundProps) {
    const [search, setSearch] = useState("")
    const textureSrc = (texture: string) =>
        `/${props.variant}/assets/minecraft/textures/block/${texture}.png`
    return (
        <Card
            h="100%"
            shadow={props.selected != null ? "outline" : ""}
            style={
                props.selected
                    ? {
                          background: `
                                linear-gradient(rgba(0,0,0,0.5),
                                rgba(0,0,0,0.5)), url('${textureSrc(
                                    props.selected,
                                )}')`,
                      }
                    : {}
            }>
            <CardHeader>
                <Heading size="lg">Custom Options Background</Heading>
            </CardHeader>
            <CardBody>
                <Flex direction="column" gap={4}>
                    <InputGroup>
                        <Input
                            variant="filled"
                            placeholder="Search"
                            value={search}
                            onChange={(ev) => setSearch(ev.target.value.trim())}
                        />
                        {search ? (
                            <InputRightElement pr={1}>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setSearch("")}>
                                    <CloseIcon />
                                </Button>
                            </InputRightElement>
                        ) : null}
                    </InputGroup>
                    <SimpleGrid minChildWidth={32} spacing={4}>
                        {TEXTURES.filter(
                            (texture) =>
                                texture == null || texture.startsWith(search),
                        ).map((texture) => (
                            <Button
                                key={texture}
                                width="100%"
                                height="100%"
                                shadow={
                                    texture == props.selected ? "outline" : ""
                                }
                                onClick={() => props.onSelectedChange(texture)}>
                                {texture != null ? (
                                    <Image src={textureSrc(texture)} p={2} />
                                ) : (
                                    <CloseIcon />
                                )}
                            </Button>
                        ))}{" "}
                    </SimpleGrid>
                </Flex>
            </CardBody>
        </Card>
    )
}

const TEXTURES = [
    null,
    "acacia_planks",
    "acacia_log_top",
    "dirt",
    "cobblestone",
    "diamond_ore",
]
