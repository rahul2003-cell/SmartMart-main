import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adminaddproduct',
  templateUrl: './adminaddproduct.component.html',
  styleUrls: ['./adminaddproduct.component.css']
})
export class AdminaddproductComponent implements OnInit {

  
  AdminAddForm : FormGroup;
  isEditMode: boolean = false;
  productId!: number;
  categories: string[] = ['Electronics', 'Groceries', 'Clothing', 'Books'];
  
private getISTDateISO(): Date {
  const date = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST = UTC + 5:30
  return new Date(date.getTime() + istOffset);
}


  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    this.createControls();
   }

   ngOnInit(): void {
     
 this.route.paramMap.subscribe(params => {
  const id = params.get('id');
  if (id) {
    this.isEditMode = true;
    this.productId = +id;
    this.loadProduct(this.productId);
  }
});

   }

   
   loadProduct(id: number) {
    this.productService.getProductsById(id).subscribe(
      (product) => {
        this.AdminAddForm.patchValue(product);
      },
      (err) => console.error('Error loading product', err)
    );
  }

   createControls(){
      this.AdminAddForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      photoImage: [null],
      createdAt: [this.getISTDateISO()],
      updatedAt: [this.getISTDateISO()] 

    });
   
  }
   
 
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.AdminAddForm.patchValue({ photoImage: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.AdminAddForm.invalid) {
      return;
    }
  
    const product: Product = this.AdminAddForm.value;
    product.updatedAt = this.getISTDateISO();
  
    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, product).subscribe(
        () => {
          this.snackBar.open('Product updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['admin/products']);
        },
        (err) => {
          console.error('Error updating product', err);
          this.snackBar.open('Failed to update product.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      );
    } else {
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.snackBar.open('Product added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.AdminAddForm.reset();
        },
        error: (err) => {
          console.error('Error adding product', err);
          this.snackBar.open('Failed to add product.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
    }
  
  
  }
}

