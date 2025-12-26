import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = ['Electronics', 'Clothing', 'Groceries', 'Books'];
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(
    private ser: ProductService,
    private router: Router,
    private dialog: MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.ser.getProducts().subscribe((data) => {
      this.products = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesSearch = this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    });
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this product?' }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.ser.deleteProduct(id).subscribe(() => {
          this.snackBar.open('Product deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.loadProducts();
        });
      }
    });

  }

  editProduct(productId: number) {
    this.router.navigate(['admin/add-product', productId]);
  }

}
