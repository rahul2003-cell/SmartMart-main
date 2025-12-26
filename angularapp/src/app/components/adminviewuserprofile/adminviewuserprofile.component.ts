import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminviewuserprofile',
  templateUrl: './adminviewuserprofile.component.html',
  styleUrls: ['./adminviewuserprofile.component.css']
})
export class AdminviewuserprofileComponent implements OnInit {

  userId: number;
  userProf: User = null;
  products: any[] = [];
  showProducts = false;
  
  constructor(private ser: UserService, private route: ActivatedRoute, private pser: ProductService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.loadUserDetails(this.userId);
        // this.loadProductsByUser(this.userId);
      }
    });
    
  }
  loadUserDetails(id: number){
   this.ser.getProfileById(id).subscribe((data) => {
    this.userProf = data;
    console.log('User Profile:', this.userProf);
  });

  }

loadProductsByUser(id: number) {
  this.pser.getProductsByUserId(id).subscribe((data) => {
    console.log('Products:', data);
    this.products = data;
  });
}

toggleProducts() {
  this.showProducts = !this.showProducts;
  if (this.showProducts && this.products.length === 0) {
    this.loadProductsByUser(this.userId);
  }
}

}
