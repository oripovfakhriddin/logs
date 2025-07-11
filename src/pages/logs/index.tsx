import { useEffect, useMemo } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useModal } from "@/hooks/useModal"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import DeleteModal from "@/components/custom/delete-modal"
import { Card, CardContent } from "@/components/ui/card"
import ParamDateRange from "@/components/as-params/date-picker-range"
import { Button } from "@/components/ui/button"
import { useLogsColumns } from "./columns"
import { DEFAULT_PAGE_SIZE } from "@/constants/default"
import { ALLLOGS } from "@/constants/api-endpoints"

export const AllLogsPages = () => {
    const columns = useLogsColumns()
    const dateFormat = "yyyy-MM-dd"
    const today = useMemo(() => new Date(), [])
    const yesterday = useMemo(
        () => new Date(today.getTime() - 24 * 60 * 60 * 1000),
        [today],
    )
    const navigate = useNavigate()
    const { openModal: openCustomerAdd } = useModal("log-modal")
    const { openModal: openModalDelete } = useModal("log-delete")
    const { storeData, setStoreData, clearUserData } =
        useTypedStoreData<LogsTypes>()
    const search = useSearch({
        from: "/_main/logs",
    }) as any

    const { page, size, startDate, endDate } = search ?? {}

    useEffect(() => {
        if (!startDate || !endDate || !page || !size) {
            navigate({
                search: {
                    ...search,
                    startDate: startDate || format(yesterday, dateFormat),
                    endDate: endDate || format(today, dateFormat),
                    page: page ? page - 1 : 0,
                    size: size ?? DEFAULT_PAGE_SIZE,
                },
            })
        }
    }, [startDate, endDate, page, size])

    const { data, isLoading } = useGet<LogsTypeResults>(ALLLOGS, {
        params: {
            ...search,
            page: page ? page - 1 : 0,
            size: size ? size : DEFAULT_PAGE_SIZE,
            startDate,
            endDate,
        },
    })

    const handleDelete = (item: LogsTypes) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: LogsTypes) => {
        clearUserData()
        setStoreData(item)
        openCustomerAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openCustomerAdd()
    }

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex flex-col sm:flex-row  justify-between sm:items-center gap-3 mb-4">
                        <h1 className="text-xl">Barcha loglar ro'yxati</h1>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center items-center gap-3">
                            <div className="w-full sm:w-auto">
                                <ParamDateRange
                                    className="w-full"
                                    from="startDate"
                                    to="endDate"
                                    defaultValue={{
                                        from: new Date(
                                            today.getTime() -
                                                24 * 60 * 60 * 1000,
                                        ),
                                        to: today,
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <ParamInput
                                    searchKey="ip"
                                    fullWidth
                                    placeholder="Log qidirish"
                                    className="w-full sm:w-auto"
                                />
                                <Button onClick={handleAdd}>
                                    <Plus className="h-4 w-4" />
                                    Qo'shish
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DataTable
                        className="text-[10px]"
                        columns={columns}
                        data={data?.log?.content}
                        onDelete={(item) => handleDelete(item.original)}
                        onEdit={(item) => handleUpdate(item.original)}
                        loading={isLoading}
                        paginationProps={{
                            totalPages: data?.log?.totalPages,
                            pageSizeParamName: "size",
                            paramName: "page",
                        }}
                        numeration
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="log-delete"
                path={ALLLOGS}
                id={storeData?.id}
            />
        </div>
    )
}
