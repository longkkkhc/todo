import env from 'dotenv'
env.config()
import app from "./app";
const PORT = process.env.PORT || 3056 ;
const server = app.listen(PORT , () => {
    console.log (`WSW eCommerce start with ${PORT}`)
})
// process.on('SIGINT',() => {
//     server.close(() => console.log (`Exit`))
//     // notify.send()
//     // // dùng để thông báo sever đóng 
// })


console.log("ENV" , process.env.PORT)
