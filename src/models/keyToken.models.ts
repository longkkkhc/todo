import{Schema, model, Document} from 'mongoose'
import { KeyToken } from '@/interfaces/keyToken.interfaces'
const keyTokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    privateKey :{
        type : String,
        required : true
    },
    publicKey :{
        type : String,
        required : true
    },
    refreshToken :{
        type : String,
        required : true
    },
    refreshTokenUsed:{
        type : Array,
        default : []
    }
})
export const keyTokenModel = model<KeyToken & Document>('KeyToken', keyTokenSchema);