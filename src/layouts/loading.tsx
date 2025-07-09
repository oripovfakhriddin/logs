import Spinner from "@/components/ui/spinner"
import { useIsFetching } from "@tanstack/react-query"

const Loading = ({
    children,
    loading,
}: {
    children: React.ReactNode
    loading: boolean
}) => {
    const isFetching = useIsFetching({ queryKey: ["user/modules/"] })
    return (
        <>
            {loading || isFetching ?
                <div className="w-full h-[80vh] flex items-center justify-center">
                    {<Spinner size="responsive" />}
                </div>
            :   children}
        </>
    )
}

export default Loading
