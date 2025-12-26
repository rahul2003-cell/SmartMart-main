import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { APP_URL } from '../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cartSubject = new BehaviorSubject<any[]>([]);
  //cartSubject is a BehaviorSubject, which is both an Observable and an Observer.
  //But exposing the subject directly is not good practice because components could call .next() and mutate the state.
  cart$ = this.cartSubject.asObservable();
  //So, you convert it to an Observable using .asObservable().
  // This way, components can only subscribe and cannot modify the cart directly.
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadCart();
   }

 

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${APP_URL}/products`, product);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${APP_URL}/products/{category}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${APP_URL}/products`);
  }

  getProductsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${APP_URL}/products/user/${userId}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${APP_URL}/products/${id}`);
  }

  updateProduct(id: number, updatedProduct: Product): Observable<any> {
    return this.http.put<any>(`${APP_URL}/products/${id}`, updatedProduct);
  }

  getProductsById(productId: number): Observable<any> {
    return this.http.get<any>(`${APP_URL}/products/${productId}`);
  }

  loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : []; //coverts JSON to array
    this.cartSubject.next(cart); 
  }


  private updateLocalStorage(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart)); //converts array[] to string to store it in LOCAL STORAGE
    this.cartSubject.next(cart);

  }
removeFromCart(product: any): void {
  const cart = this.cartSubject.value.filter(item => item.productId !== product.productId);
  this.updateLocalStorage(cart);
}

addToCart(product: any): void {
  const cart = this.cartSubject.value;
  const index = cart.findIndex(item => item.productId === product.productId);

  if (index > -1) {
    // Check if adding one more exceeds stock
    if (cart[index].quantity >= product.stock) {
      this.snackBar.open('You cannot add more than available stock.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    cart[index].quantity += 1;
  } else {
    if (product.stock === 0) {
      this.snackBar.open('This product is out of stock.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    cart.push({ ...product, quantity: 1 });
  }

  this.updateLocalStorage(cart);
}

refreshCart(cart: any[]): void {
  this.cartSubject.next(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

}
