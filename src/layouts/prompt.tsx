import { createContext, useState, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PromptContextProps {
    prompt: (title?: string) => Promise<string | null>
}

export const PromptContext = createContext<PromptContextProps | undefined>(
    undefined,
)

export const PromptProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [resolvePromise, setResolvePromise] = useState<
        (value: string | null) => void
    >(() => { })
    const [dialogTitle, setDialogTitle] = useState<string | undefined>("")
    const [inputValue, setInputValue] = useState("")

    const prompt = (title?: string) => {
        setDialogTitle(title)
        setIsOpen(true)
        return new Promise<string | null>((resolve) => {
            setResolvePromise(() => resolve)
        })
    }

    const handleConfirm = () => {
        if (inputValue && inputValue.trim().length >= 3) {
            setIsOpen(false)
            resolvePromise(inputValue)
            setInputValue("")
        } else {
            toast.error((dialogTitle || "Sabab") + " kiriting")
        }
    }

    const handleCancel = () => {
        setIsOpen(false)
        resolvePromise('')
        setInputValue("")
    }

    return (
        <PromptContext.Provider value={{ prompt }}>
            {children}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle || "Sabab?"}</DialogTitle>
                        <VisuallyHidden>
                            <DialogDescription>
                                {dialogTitle || "Sabab?"}
                            </DialogDescription>
                        </VisuallyHidden>
                    </DialogHeader>
                    <Input
                        value={inputValue}
                        fullWidth
                        autoFocus
                        required
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && handleConfirm()}
                        placeholder={dialogTitle || "Sabab?"}
                    />
                    <DialogFooter className="!flex !flex-row items-center gap-4">
                        <Button
                            onClick={handleConfirm}
                        >
                            Tasdiqlash
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant='secondary'
                        >
                            Bekor qilish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PromptContext.Provider>
    )
}
