type FormType =
    | "phone_number"
    | "number"
    | "combobox"
    | "money"
    | "date"
    | "car_number"
    | "textfield"
    | "multi-combobox"

type FormField = {
    name: string
    label: string
    placeholder?: string
    disabled?: boolean
    options?: { label: string | number; value: string | number }[]
    returnVal?: "value" | "label"
    type?: FormType
}

type SearchParams = {
    money_type?: string
    status?: string
    page_size?: string
    page_tabs?: string
    type?: string
}

type PaginationProps = {
    totalPages?: number | undefined
    paramName?: string
    disabled?: boolean
    page_sizes?: number[]
    pageSizeParamName?: string
    changePageSize?: boolean
    PageSize?: number
}

type User = {
    id: number
    username: string
    first_name: string
    last_name: string
    photo: string
    phone: string
    is_superuser: boolean
    chat_id: number
}

type MonthCalProps = {
    selectedMonth?: Date
    onMonthSelect?: (date: Date) => void
    onYearForward?: () => void
    onYearBackward?: () => void
    callbacks?: {
        yearLabel?: (year: number) => string
        monthLabel?: (month: Month) => string
    }
    variant?: {
        calendar?: {
            main?: ButtonVariant
            selected?: ButtonVariant
        }
        chevrons?: ButtonVariant
    }
    minDate?: Date
    maxDate?: Date
    disabledDates?: Date[]
    disabled?: boolean
}

type ButtonVariant =
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary"
    | null
    | undefined
type Month = {
    number: number
    name: string
}
