import { App } from './app'

const main = async() : Promise<void> =>{
    const app = new App(3000)
    await app.listen()
}

main()
