import {
    Card,
    CardBody,
    Heading,
    Image,
    Text,
    Switch,
    Flex,
    Tag,
    TagLabel,
    Stack,
    Link,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
} from "@chakra-ui/react"
import "./App.css"

import type { Variant } from "./Main"

export type Category = "aesthetic"

export interface TweakMeta {
    title: string
    description: string
    author: {
        name: string
        email: string
        homepage: string
    }
    variants: Variant[]
    category: Category
    version: string
}

interface TweakProps {
    variant: Variant
    name: string
    meta: TweakMeta
    isSelected: boolean
    onIsSelectedChange: (isSelected: boolean) => void
}

export function Tweak(props: TweakProps) {
    const isSupported = props.meta.variants.indexOf(props.variant) != -1
    const preview = `/tweaks/${props.name}/${
        isSupported ? props.variant : props.meta.variants[0]
    }/preview.png`
    return (
        <div style={{ position: "relative", height: "100%" }}>
            <Card
                height="100%"
                // bg={useColorModeValue(
                //     props.isSelected ? "gray.100" : "white",
                //     props.isSelected ? "gray.700" : "gray.800",
                // )}
                boxShadow={props.isSelected ? "outline" : "none"}
                style={
                    isSupported
                        ? {}
                        : {
                              filter: "blur(5px) contrast(102%)",
                              pointerEvents: "none",
                              userSelect: "none",
                          }
                }>
                <CardBody>
                    <Image borderRadius="lg" src={preview} mb={4} />
                    <Flex gap={4}>
                        <Heading flexGrow={1} size="lg">
                            {props.meta.title}
                        </Heading>
                        <Switch
                            size="lg"
                            isChecked={props.isSelected}
                            onChange={(ev) =>
                                props.onIsSelectedChange(ev.target.checked)
                            }
                        />
                    </Flex>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                size="sm"
                                colorScheme="purple"
                                variant="link">
                                by {props.meta.author.name}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <Flex gap={4}>
                                    <Text>{props.meta.author.email}</Text>
                                    <Link href={props.meta.author.homepage}>
                                        Homepage
                                    </Link>
                                </Flex>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>{props.meta.description}</Text>
                    <Stack direction="row">
                        {props.meta.variants.map((variant) => (
                            <Tag colorScheme="green">
                                <TagLabel>{variant}</TagLabel>
                            </Tag>
                        ))}
                        <Tag colorScheme="blue">
                            <TagLabel>Minecraft {props.meta.version}</TagLabel>
                        </Tag>
                    </Stack>
                </CardBody>
            </Card>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: !isSupported ? "block" : "none",
                }}>
                <Heading size="md">Not Supported for {props.variant}</Heading>
            </div>
        </div>
    )
}
