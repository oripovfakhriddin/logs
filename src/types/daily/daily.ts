type DailyLogsType = {
    additionalProp1: number
    additionalProp2: number
    additionalProp3: number
}

type DailyLogsTypeResults = {
    code: number
    message: string
    success: boolean
    log: DailyLogsType
    errorList:
        | null
        | [
              {
                  field: string
                  message: string
              },
          ]
}
