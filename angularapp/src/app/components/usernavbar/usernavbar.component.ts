import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {



  userName: string = '';
  cartItemCount = 0;

  constructor(private productService: ProductService) { }

  @Output() logoutClick = new EventEmitter<void>();

  ngOnInit(): void {
    this.userName = localStorage.getItem('authenticatedUser') || 'Guest';
    this.productService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  triggerLogoutPopup(): void {
    this.logoutClick.emit(); // Notify app.component to show popup
  }


}
