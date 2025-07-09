type Result = {
    code: number
    message: string
    success: boolean
    errorList:
        | null
        | [
              {
                  field: string
                  message: string
              },
          ]
}
