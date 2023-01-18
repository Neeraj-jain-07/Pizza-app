const data = require('./data.json')
const Menu = require('./app/models/menu')
const connectDB = require('./app/dbConnection/conn')

const start= async()=>{
    try{
        await connectDB()
        await Menu.create(data)
        console.log('success')
        process.exit(0)
    }
    catch(err){
       console.log(err)
       process.exit(1)
    }
}
start()