import express, { Application } from 'express'
import morgan from 'morgan' 
import productRouter from './routes/products.routes'
import UserRouter from './routes/user.routes'
import dotenv from 'dotenv';

export class App{
    private app : Application

    constructor(private port: number | string){
        this.app = express()
        this.port  = port
        this.setting()
        this.middlewares()
        this.routes()
    }
    private setting(){
        this.app.set('port', this.port || process.env.PORT ||3000)
        dotenv.config(); 
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
    }
    routes(){
        this.app.use('/products', productRouter)
        this.app.use('/users', UserRouter)        

    }

    async listen () { 
        this.app.listen(this.app.get('port'), ()=>console.log(`app on ${this.app.get('port')}`))
    }
}








