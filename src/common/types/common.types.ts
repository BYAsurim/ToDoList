export type ResponseType<D = {}> = {
    data: D,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    resultCode: number
}