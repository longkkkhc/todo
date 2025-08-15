import { StatusCodes,ReasonPhrases } from "http-status-codes";

const ReasonStatusCode = {
    FORBIDDEN: 'Forbidden error', 
    CONFLICT: 'Conflict error'
}
class ErrorReponse extends Error {
    status: number;
    constructor( message: string,status: number) {
        super(message);
        this.status = status;
    }
}
class ConflictRequestError extends ErrorReponse {
    constructor(message : string = ReasonStatusCode.CONFLICT, statusCode : number = StatusCodes.CONFLICT) 
    {
        super(message,statusCode)
    }
}
class BadRequestError extends ErrorReponse {
    constructor(message : string = ReasonPhrases.BAD_REQUEST, statusCode : number = StatusCodes.BAD_REQUEST) 
    {
        super(message,statusCode)
    }
}
class AuthFailureError extends ErrorReponse{
    constructor(message : string = ReasonPhrases.UNAUTHORIZED ,statusCode : number = StatusCodes.UNAUTHORIZED)
    {
       super(message,statusCode)
    }
}
class NotFoundError extends ErrorReponse {
    constructor(message : string = ReasonPhrases.NOT_FOUND, statusCode : number = StatusCodes.NOT_FOUND) {
        super(message,statusCode)
    }
}
class ForbiddenError extends ErrorReponse {
    constructor(message : string = ReasonStatusCode.FORBIDDEN, statusCode : number = StatusCodes.FORBIDDEN) {
        super(message,statusCode)
    }
}
export {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbiddenError
}