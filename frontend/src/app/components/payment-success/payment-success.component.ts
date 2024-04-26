import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { OrderState } from 'src/app/common/order-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit{

  constructor(private orderService: OrderService,
              private sessionStorageService: SessionStorageService,
              private router: Router){}

  ngOnInit(): void {
    console.log(this.sessionStorageService.getItem('order'));
    let order = this.sessionStorageService.getItem('order');
    let formData  = new FormData();
    formData.append('id',order.id);
    formData.append('state',OrderState.CONFIRMED.toString());

    this.orderService.updateOrder(formData).subscribe(
     data => {
      console.log(data)
      console.log('LogoutComponent'+ this.sessionStorageService.getItem('token'));
      this.sessionStorageService.removeItem('token');
      console.log('LogoutComponent eliminado'+ this.sessionStorageService.getItem('token'));

    }
    )

  }

}
