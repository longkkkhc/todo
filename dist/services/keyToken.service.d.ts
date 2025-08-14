declare class keyTokenService {
    static createKeytoken: ({ userId, privateKey, publicKey, refreshToken }: {
        userId: any;
        privateKey: any;
        publicKey: any;
        refreshToken: any;
    }) => Promise<string>;
    static findByUserId: (userId: any) => Promise<import("mongoose").Document<unknown, {}, import("../interfaces/keyToken.interfaces").KeyToken & import("mongoose").Document<unknown, any, any, Record<string, any>>, {}> & import("../interfaces/keyToken.interfaces").KeyToken & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export default keyTokenService;
