import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ItemCart } from 'src/app/common/item-cart';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{

  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage!: File | string;
  quantity: number = 0;

  ngOnInit(): void {
    this.getProductById();
  }

  constructor(private homeService: HomeService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private toastrService: ToastrService){}


  getProductById(){
    this.activatedRoute.params.subscribe(
      p => {
        let id = p['id'];
        if(id){
          this.homeService.getProductById(id).subscribe(
            data => {

              this.id = data.id;
              this.name = data.name;
              this.description = data.description;
              this.price = data.price;
              this.urlImage = data.urlImage;
            }
          )
        }
      }
    )
  }

  addCart(id: number){
    console.log('id product: ',id);
    console.log('name product: ',this.name);
    console.log('price product: ',this.price);
    console.log('quaintity product: ',this.quantity);

    let item = new ItemCart(id, this.name, this.quantity,this.price);

    this.cartService.addItemCart(item);
    console.log('total carritos');
    console.log(this.cartService.totalCart());

    this.toastrService.success('Producto añadido al carrito de compras','Carrito compras')
  }
}
