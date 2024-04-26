import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { HeaderService } from './header.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl : string = 'http://localhost:8085/api/v1/admin/products';

  constructor(private http: HttpClient,private headerService: HeaderService) { }


  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl, {headers: this.headerService.headers});
  }

  createProduct(formData: any):Observable<any>{
    return this.http.post<Product>(this.apiUrl, formData, {headers: this.headerService.headers});
  }

  deleteProductById(id: number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.headerService.headers})
  }

    getProductById(id: number):Observable<Product>{
      return this.http.get<Product>(`${this.apiUrl}/${id}`, {headers: this.headerService.headers});
    }

}