import Modal from "@/components/custom/modal"
import Header from "@/components/header"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { cn } from "@/lib/utils"
// import CustomerCreate from "@/pages/logs/customer-create"
import { ReactNode } from "@tanstack/react-router"

type Props = {
    children: ReactNode
    title?: string
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
}

const PageLayout = ({
    title,
    children,
    leftChildren,
    rigthChildren,
}: Props) => {
    const { storeData } = useTypedStoreData<{ id: number }>()
    return (
        <div className="w-full">
            <div
                className={cn(
                    "fixed top-0 right-0  z-10 transition-[width,height,padding] w-full",
                )}
            >
                <Header
                    rigthChildren={rigthChildren}
                    leftChildren={leftChildren}
                />
            </div>
            <main className="flex xl:gap-2 px-3 md:px-4 pt-[75px] pb-4  relative ">
                {children}
            </main>
            <Modal
                size="max-w-2xl"
                title={`Log ${storeData?.id ? "tahrirlash" : "qo'shish"} `}
                modalKey="log-modal"
            >
                <h1 className="text-2xl font-bold">
                    {`Log ${
                        storeData?.id ? "tahrirlash" : "qo'shish"
                    } mumkin emas!`}
                </h1>
            </Modal>
        </div>
    )
}

export default PageLayout
