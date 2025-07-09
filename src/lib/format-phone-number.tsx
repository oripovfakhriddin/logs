export const formatPhoneNumber = (phoneNumberString: string | null) => {
    if (phoneNumberString) {
        return `+${phoneNumberString.slice(0, 3)} ${phoneNumberString.slice(2, 4)} ${phoneNumberString.slice(5, 8)} ${phoneNumberString.slice(8, 10)} ${phoneNumberString.slice(10)}`
    } else {
        return ""
    }
}
