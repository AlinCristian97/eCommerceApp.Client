import { Component, OnInit } from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/productType";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes()
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

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (n) => (this.types = n),
      error: (e) => (console.log(e))
    });
  }
}
