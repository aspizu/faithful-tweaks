import {cn} from "@/lib/utils"
import {useWindowSize} from "@uidotdev/usehooks"
import React, {ComponentPropsWithoutRef, CSSProperties, useEffect, useRef} from "react"

interface GlowAreaProps extends ComponentPropsWithoutRef<"div"> {
    size?: number
}

export function GlowArea(props: GlowAreaProps) {
    const {className = "", size = 300, ...rest} = props
    const element = useRef<HTMLDivElement>(null)
    const frameId = useRef<number | null>(null)
    const latestCoords = useRef<{x: number; y: number} | null>(null)

    function updateGlow() {
        if (latestCoords.current && element.current) {
            element.current.style.setProperty("--glow-x", `${latestCoords.current.x}px`)
            element.current.style.setProperty("--glow-y", `${latestCoords.current.y}px`)
            frameId.current = null
        }
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const bounds = e.currentTarget.getBoundingClientRect()
        latestCoords.current = {
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
        }

        if (!frameId.current) {
            frameId.current = requestAnimationFrame(() => updateGlow())
        }
    }

    function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
        e.currentTarget.style.removeProperty("--glow-x")
        e.currentTarget.style.removeProperty("--glow-y")
    }
    return (
        <div
            ref={element}
            style={
                {
                    position: "relative",
                    "--glow-size": `${size}px`,
                } as CSSProperties
            }
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(className, "")}
            {...rest}
        />
    )
}

GlowArea.displayName = "GlowArea"

interface GlowProps extends ComponentPropsWithoutRef<"div"> {
    color?: string
}

export function Glow(props: GlowProps) {
    const {className, color = "blue", children, ...rest} = props
    const element = useRef<HTMLDivElement>(null)

    const window = useWindowSize()

    useEffect(() => {
        element.current?.style.setProperty(
            "--glow-top",
            `${element.current?.offsetTop}px`,
        )
        element.current?.style.setProperty(
            "--glow-left",
            `${element.current?.offsetLeft}px`,
        )
    }, [window.width, window.height])

    return (
        <div ref={element} className={cn(className, "relative")}>
            <div
                {...rest}
                style={{
                    backgroundImage: `radial-gradient(
            var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            transparent 100%
          )`,
                }}
                className={cn(
                    className,
                    "after:bg-background/90 pointer-events-none absolute inset-0 mix-blend-multiply after:absolute after:inset-0.25 after:rounded-[inherit] after:content-[''] dark:mix-blend-lighten",
                )}
            ></div>
            {children}
        </div>
    )
}

Glow.displayName = "Glow"
