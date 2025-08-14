declare const findbyId: (key?: string) => Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/apikey.interfaces").ApiKey & import("mongoose").Document<unknown, any, any, Record<string, any>>, {}> & import("../interfaces/apikey.interfaces").ApiKey & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | (import("mongoose").FlattenMaps<import("../interfaces/apikey.interfaces").ApiKey & import("mongoose").Document<unknown, any, any, Record<string, any>>> & Required<{
    _id: import("mongoose").FlattenMaps<unknown>;
}> & {
    __v: number;
})>;
export default findbyId;
