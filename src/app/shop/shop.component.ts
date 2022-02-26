import { Component, OnInit } from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {

  }

  getProducts() {
    this.shopService.getProducts().subscribe({
      next: (n) => (this.products = n.data),
      error: (e) => (console.log(e))
    });
  }

  getBrands() {
  this.shopService.getBrands().subscribe({
    next: (n) => (this.brands = n),
    error: (e) => (console.log(e))
  });
  }
}
