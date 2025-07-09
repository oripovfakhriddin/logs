import { PromptContext } from "@/layouts/prompt"
import { useContext } from "react"

export const usePrompt = () => {
    const context = useContext(PromptContext)
    if (!context) {
        throw new Error("usePrompt must be used within a PromptProvider")
    }
    return context.prompt
}
