import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

declare var paypal: any; // Declare PayPal globally

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(private router: Router, private ser: OrderService, private pes: ProductService, private snackBar: MatSnackBar) { }
  order: Order = null;
  amount: number = 0;
  ngOnInit(): void {
    this.order = this.ser.getOrder();

    if (!this.order) {
      console.error('Order is null. Redirecting to cart or showing error.');

      this.snackBar.open('No order found. Please place an order before proceeding to payment.', 'Close', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });

      this.router.navigate(['/user/cart']);
      return;
    }

    this.amount = this.order?.totalAmount;
    if (paypal) {
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (data: any, actions: any) => {
          // const currency = 'INR';
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.amount.toString(),
                // currency_code: currency 
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed:', details);

            this.snackBar.open(`Payment Successful! Thank you, ${details.payer.name.given_name}`, 'Close', {
              duration: 4000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            this.ser.placeOrder(this.order).subscribe({
              next: () => {
                localStorage.removeItem('cart');
                this.router.navigate(['/user/cart']);
                this.snackBar.open('Order placed successfully!', 'Close', {
                  duration: 4000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'center'
                });
              },
              error: (err) => console.error('Error placing order:', err)
            });
          });

        },
        onError: (err: any) => {
          console.error('Payment error:', err);
          this.snackBar.open('Payment failed. Please try again.', 'Close', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      }).render(this.paymentRef.nativeElement);
    } else {
      console.error('PayPal SDK not loaded.');
    }
  }
  cancel() {
    this.router.navigate(['/user/cart']);
  }
}