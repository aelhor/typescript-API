

export class User { 
    id : number
    name: string
    email: string
    password: string

    constructor(data:any){
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.password = data.password
    }
    
}