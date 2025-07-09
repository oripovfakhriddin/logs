type ServicesCountType = {
    additionalProp1: number
    additionalProp2: number
    additionalProp3: number
}

type ServicesCountTypeResult = {
    code: number
    message: string
    success: boolean
    log: ServicesCountType
    errorList:
        | null
        | [
              {
                  field: string
                  message: string
              },
          ]
}
