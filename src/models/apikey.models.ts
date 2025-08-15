import {Schema,model,Document} from 'mongoose'
import {ApiKey} from '../interfaces/apikey.interfaces'
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
        enum : ['TODO_READ',     
        'TODO_CREATE',   
        'TODO_UPDATE',   
        'TODO_DELETE',  
        'USER_MANAGE',   
        'ADMIN' 
        ]
    }
})
export const apikeyModel = model<ApiKey & Document>('ApiKey', ApiKeySchema);