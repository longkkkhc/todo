import {Schema,model,Document} from 'mongoose'
import {ApiKey} from '@interfaces/apikey.interfaces'
const ApiKeySchema : Schema = new Schema({
    key :{
        type : String,
        required : true
    },
    status :{
        type : Boolean,
        default : false
    },
    permissions :{
        type : [String],
        required : true,
        enum : ['0000','1111','2222']
    }
})
export const apikeyModel = model<ApiKey & Document>('ApiKey', ApiKeySchema);