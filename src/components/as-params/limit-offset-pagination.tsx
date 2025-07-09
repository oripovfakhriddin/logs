import { DEFAULT_PAGE_SIZE } from "@/constants/default"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import Select from "../ui/select"

const LimitOffsetPagination: React.FC<
    PaginationProps & {
        changePageSize?: boolean
        next: string | null | undefined
        previous: string | null | undefined
    }
> = ({
    page_sizes = [10, DEFAULT_PAGE_SIZE, 50, 75, 100],
    paramName = "offset",
    pageSizeParamName = "limit",
    disabled = false,
    changePageSize = true,
    PageSize = DEFAULT_PAGE_SIZE,
    next = null,
    previous = null,
}) => {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main" }) as Record<
        string,
        string | undefined
    >

    const getCursorFromUrl = (url: string | null) => {
        if (!url) return null
        const urlParams = new URLSearchParams(url.split("?")[1])
        return urlParams.get(paramName)
    }

    const handlePrevious = () => {
        const prevCursor = getCursorFromUrl(previous)
        navigate({
            search: {
                ...search,
                [paramName]: prevCursor,
                [pageSizeParamName]: undefined,
            },
        })
    }

    const handleNext = () => {
        const nextCursor = getCursorFromUrl(next)
        navigate({
            search: {
                ...search,
                [paramName]: nextCursor,
                [pageSizeParamName]: undefined,
            },
        })
    }

    return (
        <div className="flex items-center gap-4">
            <Button
                disabled={disabled || !previous}
                icon={<ChevronLeft width={20} />}
                variant="ghost"
                onClick={handlePrevious}
                size="icon"
                aria-label="Previous Page"
                className="w-7 h-7 mt-1 sm:m-0 sm:w-10 sm:h-10"
            />
            <Button
                disabled={disabled || !next}
                icon={<ChevronRight width={20} />}
                variant="ghost"
                onClick={handleNext}
                size="icon"
                aria-label="Next Page"
                className="w-7 h-7 mt-1 sm:m-0 sm:w-10 sm:h-10"
            />
            {changePageSize && (
                <Select
                    disabled={disabled}
                    className="w-20 h-8 sm:h-10"
                    label=""
                    options={page_sizes?.map((size) => ({
                        label: `${size}`,
                        value: `${size}`,
                    }))}
                    value={search[pageSizeParamName] || PageSize}
                    setValue={(value) =>
                        navigate({
                            search: { ...search, [pageSizeParamName]: +value },
                        })
                    }
                />
            )}
        </div>
    )
}

export default LimitOffsetPagination
