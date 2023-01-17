

export class Product { 
    public id :number 
    public title:string 
    public image :string 
    public price :number
    public user_id :number

    constructor(data:any){
        this.id = data.id
        this.title = data.title
        this.image = data.image
        this.price = data.price
        this.user_id = data.user_id
    }

}