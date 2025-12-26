import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }



  selectedCategory: string = '';
  searchTerm: string = '';
  categories: string[] = [];
  filteredProducts: Product[] = [];
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.categories = [...new Set(this.products.map(p => p.category))];
        this.filteredProducts = this.products;
      },

      error: (err) => {
        console.error('Error fetching products', err);
        this.snackBar.open('Failed to load products. Please try again later.', 'Close', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product =>
      (this.selectedCategory ? product.category === this.selectedCategory : true) &&
      (this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true)
    );
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.snackBar.open(`${product.name} added to cart!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }



}

