import { Component, OnInit } from '@angular/core';
import { ItemCart } from 'src/app/common/item-cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from 'src/app/common/order-product';
import { Order } from 'src/app/common/order';
import { OrderState } from 'src/app/common/order-state';
import { OrderService } from '../../../services/order.service';
import { PaymentService } from '../../../services/payment.service';
import { DataPayment } from 'src/app/common/data-payment';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-sumary-order',
  templateUrl: './sumary-order.component.html',
  styleUrls: ['./sumary-order.component.css']
})
export class SumaryOrderComponent implements OnInit{

  items : ItemCart[] = [];
  totalCart : number = 0;
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  address : string = '';

  orderProducts: OrderProduct[] = [];
  userId: number = 0;

  constructor(private cartService: CartService, private userService: UserService,
              private orderService: OrderService,
              private paymentService: PaymentService,
              private sessionStorageService: SessionStorageService){}

  ngOnInit(): void {
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.userId = this.sessionStorageService.getItem('token').id;
    this.getUserById(this.userId);
    setTimeout(
      ()=> {
        this.sessionStorageService.removeItem('token');
      },600000);

  }

  generateOrder(){
    this.items.forEach(
      item =>{
        let orderProduct = new OrderProduct(null, item.productId, item.quantity, item.price);
        this.orderProducts.push(orderProduct);
      }
    );

    let order = new Order(null,new Date(), this.orderProducts, this.userId,OrderState.CANCELED);
    console.log('order: '+ order.orderState);
    this.orderService.createOrder(order).subscribe(
      data => {
        console.log('Order creada con id: ', data.id);
        this.sessionStorageService.setItem('order', data);
      }
    );


    // REDIRECCION Y PAGO CON PAYPAL
    let urlPayment;
    let dataPayment = new  DataPayment('PAYPAL',this.totalCart.toString(),'USD','COMPRA');
    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(
      data => {
        urlPayment = data.url;
        console.log('Respuesta exitosa...');
        window.location.href = urlPayment;
      }
    )
  }


  deleteItemCart(productId: number){
    this.cartService.deleteItemCart(productId);
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  getUserById(id: number){
    this.userService.getUserById(id).subscribe(
      data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;
      }
    )
  }
}
