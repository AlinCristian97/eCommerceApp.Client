import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPagination} from "./shared/models/pagination";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eCommerce';
  products: any[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe({
      next: (n:IPagination) => (this.products = n.data),
      error: (e:any) => (console.log(e))
    })
  }
}
