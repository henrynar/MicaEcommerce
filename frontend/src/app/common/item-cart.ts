export class ItemCart {
  constructor(
    public productId: number,
    public productname: string,
    public quantity: number,
    public price: number,
  ){}

  getTotalPriceItem(){
    return this.quantity * this.price;
  }
}
