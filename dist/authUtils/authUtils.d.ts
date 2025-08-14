declare const createKeypair: (payload: Object, publickey: string, privateKey: string) => Promise<{
    accessToken: any;
    refreshToken: any;
}>;
declare const authorization: (req: any, res: any, next: any) => void;
export { createKeypair, authorization };
