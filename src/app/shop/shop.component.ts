import { Component, OnInit } from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/productType";
import {ShopParams} from "../shared/models/shopParams";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes()
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (n) => {
        this.products = n.data;
        this.shopParams.pageNumber = n.pageIndex;
        this.shopParams.pageSize = n.pageSize;
        this.totalCount = n.count;
      },
      error: (e) => (console.log(e))
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (n) => (this.brands = [{id: 0, name: 'All'}, ...n]),
      error: (e) => (console.log(e))
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (n) => (this.types = [{id: 0, name: 'All'}, ...n]),
      error: (e) => (console.log(e))
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }
}
