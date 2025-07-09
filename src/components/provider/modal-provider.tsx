import { useLocation } from "@tanstack/react-router"
import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

// Define the context interface
interface ModalContextType {
    modals: Record<string, boolean>
    openModal: (key: string) => void
    closeModal: (key: string) => void
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// ModalProvider component to wrap your app
export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation()
    const [modals, setModals] = useState<Record<string, boolean>>({})

    useEffect(() => {
        setModals({})
    }, [location.pathname])

    const openModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: true }))
    }, [])
    const closeModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: false }))
    }, [])

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context
}
