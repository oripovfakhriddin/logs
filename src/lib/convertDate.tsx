import { format } from "date-fns"
import { uz } from "date-fns/locale"

export default function convertDate(date: string, not_full?: boolean): string {
    if (date) {
        const givenDate: Date = new Date(date)
        return format(givenDate, not_full ? "dd-MMM" : "dd-MMMM", {
            locale: uz,
        }).toLowerCase()
    } else {
        return ""
    }
}
