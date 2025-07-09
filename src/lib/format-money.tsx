import { ClassNameValue } from "tailwind-merge"

export function formatMoney(
    amount?: number | string,
    className?: ClassNameValue,
    suffix?: boolean,
) {
    const [integerPart, decimalPart] =
        amount ? amount.toString().split(".") : ""
    const newIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    if (amount) {
        if (decimalPart && +decimalPart > 0) {
            return (
                <span className={`${className} text-nowrap`}>
                    {newIntegerPart}.{decimalPart} {suffix ? " so'm" : ""}
                </span>
            )
        } else {
            return (
                <span className={`${className} text-nowrap`}>
                    {newIntegerPart} {suffix ? " so'm" : ""}
                </span>
            )
        }
    } else {
        return (
            <span className={`${className} text-nowrap`}>
                0 {suffix ? " so'm" : ""}
            </span>
        )
    }
}
