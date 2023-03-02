import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductType } from '../../../../types/product.type';
import { ProductService } from '../../../shared/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: ProductType[] = [];
  private subscription: Subscription | null = null;
  public loading: boolean = false;

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.loading = true;
    this.subscription = this.productService
      .getProducts()
      .pipe(tap(() => (this.loading = false)))
      .subscribe({
        next: data => {
          this.products = data;
          console.log('next');
        },
        error: error => {
          console.log(error);
          this.router.navigate(['']);
        },
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
