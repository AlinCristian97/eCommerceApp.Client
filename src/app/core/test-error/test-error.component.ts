import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: n => (console.log(n)),
      error: e => (console.log(e))
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: n => (console.log(n)),
      error: e => (console.log(e))
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: n => (console.log(n)),
      error: e => (console.log(e))
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: n => (console.log(n)),
      error: e => {
        console.log(e);
        this.validationErrors = e.errors;
      }
    });
  }

}
