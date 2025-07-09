import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useLogsColumns } from "./columns"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useGet } from "@/hooks/useGet"
import { ALLLOGS } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { DEFAULT_PAGE_SIZE } from "@/constants/default"

export const AllLogsPages = () => {
    const { openModal: openCustomerAdd } = useModal("customer-modal")
    const { openModal: openModalDelete } = useModal("customer-delete")
    const { storeData, setStoreData, clearUserData } =
        useTypedStoreData<LogsTypes>()
    const search = useSearch({
        from: "/_main/logs",
    }) as any

    const { page, size } = search

    const { data, isLoading } = useGet<LogsTypeResults>(ALLLOGS, {
        params: {
            ...search,
            page: page ? page - 1 : 0,
            size: size ? size : DEFAULT_PAGE_SIZE,
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

    const columns = useLogsColumns()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex flex-col sm:flex-row  justify-between sm:items-center gap-3 mb-4">
                        <h1 className="text-xl">Barcha loglar ro'yxati</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Log qidirish"
                                className=""
                            />
                            <Button onClick={handleAdd}>
                                <Plus className="h-4 w-4" />
                                Qo'shish
                            </Button>
                        </div>
                    </div>
                    <DataTable
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
            {/* <DeleteModal
                modalKey="customer-delete"
                id={storeData?.id}
                path={USERS}
            /> */}
        </div>
    )
}
