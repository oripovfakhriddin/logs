export default function convertTime(givenDateString: string) {
    if (givenDateString) {
        const givenDate: Date = new Date(givenDateString)
        const currentDate: Date = new Date()
        const difference: number = +currentDate - +givenDate

        const hoursDifference = Math.floor(difference / (1000 * 60 * 60))
        const minutesDifference = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
        )

        return `${hoursDifference} soat ${minutesDifference} minut`
    } else {
        return ""
    }
}
