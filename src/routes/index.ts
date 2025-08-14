 import { Router } from "express";
    import { apikeyCheck, permissions } from "@/authUtils/checkUtils";
    import userRouter from './user'; // <-- Thay đổi này
    import todoRouter from './todo'; // <-- Thay đổi này
    const router = Router();
    router.use(apikeyCheck);
    router.use(permissions('0000'));
    router.use('/v1/api/user', userRouter); // <-- Thay đổi này
    router.use('/v1/api/todo', todoRouter); // <-- Thay đổi này
    export default router;