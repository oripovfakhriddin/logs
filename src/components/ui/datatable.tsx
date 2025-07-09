import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type Row,
} from "@tanstack/react-table"
import * as React from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DEFAULT_PAGE_SIZE, PAGE_KEY, PAGE_SIZE_KEY } from "@/constants/default"
import { cn } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import CursorPagination from "../as-params/cursor-pagination"
import LimitOffsetPagination from "../as-params/limit-offset-pagination"
import ParamPagination from "../as-params/pagination"
import EmptyBox from "../custom/empty-box"
import TableActions from "../custom/table-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "./checkbox"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

interface DataTableProps<TData> {
    data: TData[] | undefined
    columns: ColumnDef<TData>[]
    loading?: boolean
    className?: string
    onRightClick?: (val: TData) => void
    selecteds_row?: boolean
    onRowClick?: (data: TData) => void
    disabled?: boolean
    rowColor?: (data: TData) => string
    paginationProps?: PaginationProps
    cursorPagination?: {
        next: string | null | undefined
        previous: string | null | undefined
        disabed?: boolean
        changePageSize?: boolean
        pageSizeParamName?: string
        paramName?: string
    }
    limitOffsetPagination?: {
        next: string | null | undefined
        previous: string | null | undefined
        disabed?: boolean
        changePageSize?: boolean
        pageSizeParamName?: string
        paramName?: string
    }
    viewAll?: boolean
    head?: React.ReactNode
    viewCount?: number | boolean | undefined
    sortable?: boolean
    height?: string
    numeration?: boolean
    wrapperClassName?: string
    actionMenuMode?: boolean
    onEdit?: (data: Row<TData>) => void
    onDelete?: (data: Row<TData>) => void
    onUndo?: (data: Row<TData>) => void
    onView?: (data: Row<TData>) => void
    tableWrapperClassName?: string
    skeletonRowCount?: number
    onSelectedRowsChange?: (rows: TData[]) => void
}

export function DataTable<TData>({
    data,
    columns,
    loading,
    className = "min-w-[1100px]",
    onRightClick,
    selecteds_row,
    onRowClick,
    disabled,
    rowColor,
    paginationProps,
    cursorPagination,
    limitOffsetPagination,
    viewAll,
    height = "h-[65vh]",
    head,
    viewCount,
    numeration = false,
    wrapperClassName,
    actionMenuMode,
    onEdit,
    onDelete,
    onUndo,
    onView,
    tableWrapperClassName,
    onSelectedRowsChange,
    skeletonRowCount = 15,
}: DataTableProps<TData>) {
    const {
        paramName = PAGE_KEY,
        pageSizeParamName = PAGE_SIZE_KEY,
        totalPages,
    } = paginationProps || {}
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [selecteds, setSelecteds] = React.useState<any>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const search: any = useSearch({ from: "/_main" })

    const orderedColumns = React.useMemo(() => {
        if (onDelete || onEdit || onUndo || onView) {
            return [
                ...columns,
                {
                    header: " ",
                    accessorKey: "action",
                    enableSorting: false,
                    cell: ({ row }) => (
                        <TableActions
                            menuMode={actionMenuMode}
                            onDelete={
                                onDelete ? () => onDelete?.(row) : undefined
                            }
                            onEdit={onEdit ? () => onEdit?.(row) : undefined}
                            onUndo={onUndo ? () => onUndo?.(row) : undefined}
                            onView={onView ? () => onView?.(row) : undefined}
                        />
                    ),
                },
            ]
        } else return columns
    }, [actionMenuMode, columns, onDelete, onEdit, onUndo, onView])

    const table = useReactTable({
        data: data || [],
        columns: orderedColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel({
            initialSync: true,
        }),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setSelecteds,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection: selecteds,
            pagination: {
                pageIndex: search[paramName] ? +search[paramName] - 1 : 0,
                pageSize: search[pageSizeParamName]
                    ? +search[pageSizeParamName]
                    : 25,
            },
        },
        manualPagination:
            !!totalPages ||
            !!cursorPagination ||
            viewAll ||
            !!limitOffsetPagination,
    })

    React.useEffect(() => {
        const selectedRows = table
            .getSelectedRowModel()
            .rows.map((row) => row.original)

        onSelectedRowsChange?.(selectedRows)
    }, [selecteds])

    return (
        <main className={cn("w-full   pb-4 overflow-x-auto", wrapperClassName)}>
            {!!head && <div>{head}</div>}

            <div className={cn("relative  rounded-md ", tableWrapperClassName)}>
                {loading && (
                    <Table className="flex flex-col gap-1">
                        {Array.from({ length: skeletonRowCount })?.map(
                            (_, index) => (
                                <TableBody key={index}>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup, index) => (
                                            <TableRow
                                                key={index}
                                                className={`grid gap-1 `}
                                                style={{
                                                    gridTemplateColumns: `repeat(${
                                                        headerGroup?.headers
                                                            ?.length || 0
                                                    }, minmax(0, 1fr))`,
                                                }}
                                            >
                                                {headerGroup.headers.map(
                                                    (_, index) => {
                                                        return (
                                                            <TableCell
                                                                key={index}
                                                                className="px-0 py-0"
                                                            >
                                                                <Skeleton
                                                                    className={
                                                                        "h-full"
                                                                    }
                                                                />
                                                            </TableCell>
                                                        )
                                                    },
                                                )}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            ),
                        )}
                    </Table>
                )}
                {data?.length ? (
                    <Table
                        className={`${className} select-text  bg-card rounded-md`}
                    >
                        <TableHeader>
                            {table
                                .getHeaderGroups()
                                .map((headerGroup, index) => (
                                    <TableRow
                                        key={index}
                                        className="border-none "
                                    >
                                        {selecteds_row && (
                                            <TableHead key={index} className="">
                                                <Checkbox
                                                    checked={
                                                        table.getIsAllPageRowsSelected() ||
                                                        (table.getIsSomePageRowsSelected() &&
                                                            "indeterminate")
                                                    }
                                                    onCheckedChange={(value) =>
                                                        table.toggleAllPageRowsSelected(
                                                            !!value,
                                                        )
                                                    }
                                                    aria-label="Select all"
                                                />
                                            </TableHead>
                                        )}
                                        {numeration && (
                                            <TableHead
                                                key={index}
                                                className={cn(
                                                    " px-2  cursor-pointer",
                                                    index === 0 && "w-8",
                                                )}
                                            >
                                                №
                                            </TableHead>
                                        )}

                                        {headerGroup.headers.map(
                                            (header, index) => {
                                                return (
                                                    <TableHead
                                                        key={index}
                                                        className={cn(
                                                            "px-2 cursor-pointer",
                                                        )}
                                                        onClick={
                                                            header.column
                                                                .columnDef
                                                                .enableSorting
                                                                ? header.column.getToggleSortingHandler()
                                                                : undefined
                                                        }
                                                    >
                                                        <div className="cursor-pointer flex items-center gap-1 select-none w-max">
                                                            {flexRender(
                                                                header.column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext(),
                                                            )}

                                                            {header.column
                                                                .columnDef
                                                                .enableSorting
                                                                ? {
                                                                      asc: (
                                                                          <ChevronUp
                                                                              className="text-muted-foreground"
                                                                              width={
                                                                                  16
                                                                              }
                                                                          />
                                                                      ),
                                                                      desc: (
                                                                          <ChevronDown
                                                                              className="text-muted-foreground"
                                                                              width={
                                                                                  16
                                                                              }
                                                                          />
                                                                      ),
                                                                  }[
                                                                      header.column.getIsSorted() as string
                                                                  ] ?? (
                                                                      <ChevronsUpDown
                                                                          className="text-muted-foreground"
                                                                          width={
                                                                              16
                                                                          }
                                                                      />
                                                                  )
                                                                : null}
                                                        </div>
                                                    </TableHead>
                                                )
                                            },
                                        )}
                                    </TableRow>
                                ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length > 0 ? (
                                table.getRowModel().rows?.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        onContextMenu={(e) => {
                                            e.preventDefault()
                                            onRightClick?.(row.original)
                                        }}
                                        className={cn(
                                            "hover:bg-gray-200 dark:hover:bg-secondary border-none ",
                                            rowColor?.(row.original),
                                            index % 2 !== 0 &&
                                                "bg-secondary/70",
                                        )}
                                    >
                                        {selecteds_row && (
                                            <TableCell className="w-8 ">
                                                <Checkbox
                                                    checked={row.getIsSelected()}
                                                    onCheckedChange={(value) =>
                                                        row.toggleSelected(
                                                            !!value,
                                                        )
                                                    }
                                                    aria-label="Select row"
                                                />
                                            </TableCell>
                                        )}
                                        {numeration && (
                                            <TableCell className="w-8">
                                                {((search[paramName] || 1) -
                                                    1) *
                                                    (search[
                                                        pageSizeParamName
                                                    ] || DEFAULT_PAGE_SIZE) +
                                                    index +
                                                    1}
                                            </TableCell>
                                        )}

                                        {row
                                            .getVisibleCells()
                                            .map((cell, index) => (
                                                <TableCell
                                                    key={index}
                                                    onClick={() =>
                                                        !notClick(
                                                            cell.column.id,
                                                        ) &&
                                                        onRowClick?.(
                                                            cell.row.original,
                                                        )
                                                    }
                                                    className={cn(
                                                        `cursor-pointer border-r border-secondary last:border-none  ${
                                                            notClick(
                                                                cell.column.id,
                                                            ) &&
                                                            "cursor-default"
                                                        }`,
                                                    )}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns?.length}
                                        className="h-24 text-center"
                                    >
                                        Mavjud emas
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                ) : null}
                {data?.length === 0 ? <EmptyBox height={height} /> : null}
            </div>
            {!viewAll && data?.length ? (
                <div className="pt-4 mx-auto w-full relative flex justify-center">
                    {!!viewCount && !!table.getRowModel().rows?.length && (
                        <p className="absolute top-6 left-2">
                            Soni:{" "}
                            {typeof viewCount === "number"
                                ? viewCount
                                : table.getRowModel().rows?.length}{" "}
                            ta
                        </p>
                    )}
                    {totalPages ? (
                        <ParamPagination
                            disabled={disabled || loading}
                            {...paginationProps}
                        />
                    ) : cursorPagination ? (
                        <CursorPagination
                            {...cursorPagination}
                            disabled={disabled || loading}
                        />
                    ) : limitOffsetPagination ? (
                        <LimitOffsetPagination
                            {...limitOffsetPagination}
                            disabled={disabled || loading}
                        />
                    ) : (
                        <ParamPagination
                            disabled={disabled || loading}
                            {...paginationProps}
                            totalPages={table.getPageCount() || 1}
                            PageSize={table.getState().pagination.pageSize}
                        />
                    )}
                </div>
            ) : (
                ""
            )}
        </main>
    )
}

function notClick(id: string) {
    return [
        "code",
        "phone_number",
        "phone",
        "Amallar",
        "Boshqarish",
        " ",
        "Telefon",
    ].includes(id)
}
