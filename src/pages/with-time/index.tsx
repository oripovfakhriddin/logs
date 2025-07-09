import ParamInput from "@/components/as-params/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { WITHTIME } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useSearch } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useWithTimeColumns } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { DEFAULT_PAGE_SIZE } from "@/constants/default"

const WithTimePage = () => {
    const { openModal: openCustomerAdd } = useModal("log-modal")
    const { openModal: openModalDelete } = useModal("log-delete")
    const { storeData, setStoreData, clearUserData } =
        useTypedStoreData<LogsTypes>()
    const { search } = useSearch({
        from: "/_main/with-time",
    }) as any

    // const { page, size } = search

    const { data, isLoading } = useGet<WithTimeTypeResults>(WITHTIME, {
        params: {
            ...search,
            // page: page ? page - 1 : 0,
            // size: size ? size : DEFAULT_PAGE_SIZE,
            // start: "2025-06-10",
            // end: "2025-07-10",
        },
    })

    console.log(data)

    const handleDelete = (item: WithTimeType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: WithTimeType) => {
        clearUserData()
        setStoreData(item)
        openCustomerAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openCustomerAdd()
    }

    const columns = useWithTimeColumns()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex flex-col sm:flex-row  justify-between sm:items-center gap-3 mb-4">
                        <h1 className="text-xl">With time</h1>
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
                            totalPages: data?.log?.totalElements,
                        }}
                        numeration
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="log-delete"
                id={storeData?.id}
                path={WITHTIME}
            />
        </div>
    )
}

export default WithTimePage
