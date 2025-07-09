import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export default function SeeMore({ open = true, setOpen, d, children }: { d?: any, children?: React.ReactNode, open?: boolean, setOpen?: (val: boolean) => void }) {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <Dialog open={setOpen ? open : undefined} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
                {children ?? <Badge>
                    {d?.name}
                </Badge>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl min-h-64 max-h-[80vh] w-full !p-0 bg-transparent shadow-none border-none">
                <DialogHeader className="hidden">
                    <DialogTitle className="text-left hidden">{d?.name}</DialogTitle>
                    <VisuallyHidden><DialogDescription>{d?.name}</DialogDescription></VisuallyHidden>
                </DialogHeader>
                <Carousel className="w-full"
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}>
                    <CarouselContent>
                        {d?.images?.map((i: { image: string }, index: number) => (
                            <CarouselItem key={index}>
                                <img src={i?.image} key={index} alt="img" className="w-full max-h-[80vh] object-cover" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}
