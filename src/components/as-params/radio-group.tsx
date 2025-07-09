import { useNavigate, useSearch } from "@tanstack/react-router"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

type RadioOption = {
    value: string | undefined | number
    label: string
    paramValue?: undefined | string
    [key: string]: any
    inn?: string
}

type ParamRadioGroupProps = {
    options: RadioOption[]
    paramName: string
    className?: string
    anotherValue?: { [key: string]: string | undefined }
    disabled?: boolean
    returnVal?: "value" | "label" | "paramValue"
    pageKey?: string
}

const ParamRadioGroup: React.FC<ParamRadioGroupProps> = ({
    options,
    paramName,
    className,
    anotherValue,
    disabled,
    returnVal = "paramValue",
    pageKey = "page",
}) => {
    const navigate = useNavigate()
    const params: any = useSearch({ from: "/_main" })

    const currentParamValue = params[paramName]

    const initialValue =
        options
            .find((option) => option?.[returnVal] === currentParamValue)
            ?.[returnVal]?.toString() || options[0]?.value?.toString()
    const handleValueChange = (value: string) => {
        const option = options.find(
            (option) => option[returnVal]?.toString() === value,
        )
        const paramVal = option?.[returnVal]
        const searchValue =
            typeof option?.[returnVal] === "number" ?
                option?.[returnVal]
            :   paramVal

        navigate({
            search: {
                ...params,
                ...anotherValue,
                [paramName]: searchValue,
                [pageKey]: undefined,
            },
        })
    }

    return (
        <RadioGroup
            className={className || "flex gap-4 lg:w-max overflow-x-auto"}
            defaultValue={options[0]?.[returnVal]?.toString()}
            value={initialValue?.toString()}
            onValueChange={handleValueChange}
            disabled={disabled}
        >
            {options.map((option) => (
                <div
                    className="flex items-center space-x-2 w-auto"
                    key={option.label}
                >
                    <RadioGroupItem
                        value={
                            option?.[returnVal]?.toString() ||
                            option?.value?.toString() ||
                            "all"
                        }
                        id={`${option.value}-radio`}
                        className="w-4"
                    />
                    <Label
                        htmlFor={`${option.value}-radio`}
                        className="cursor-pointer whitespace-nowrap"
                    >
                        {option.label}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export default ParamRadioGroup
