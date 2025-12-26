import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminvieworders',
  templateUrl: './adminvieworders.component.html',
  styleUrls: ['./adminvieworders.component.css']
})
export class AdminviewordersComponent implements OnInit {

  constructor(private ser: OrderService, private snackBar: MatSnackBar) { }
  dataSource = new MatTableDataSource<Order>();
  // statusOptions: string[] = ['PENDING', 'ACCEPTED', 'PACKED', 'SHIPPED', 'DELIVERED', 'OUT FOR DELIVERY', 'CANCEL', 'RETURN'];
  statusOptions: string[] = ['pending', 'processing', 'packed', 'shipped', 'delivered', 'out for delivery', 'cancel', 'return','accepted' ];
  displayedColumns: string[] = [
    'sno', 'orderId', 'username', 'productName', 'price', 'shippingAddress', 'totalAmount', 'quantity', 'status'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  searchText: string = '';
  selectedStatus: string = '';
  
  ngOnInit(): void {
    this.getOrders();
  
    this.dataSource.filterPredicate = (data: Order, filter: string) => {
      const parsedFilter = JSON.parse(filter);
      const searchText = parsedFilter.searchText;
      const status = parsedFilter.status;
  
      // Match search text (orderId, username, product names)
      const matchesSearch =
        data.orderId.toString().toLowerCase().includes(searchText) ||
        data.user.username.toLowerCase().includes(searchText) ||
        data.product.some(p => p.name.toLowerCase().includes(searchText));
  
      // Match status
      const matchesStatus = status ? data.status.toLowerCase() === status : true;
  
      return matchesSearch && matchesStatus;
    };
  }


  getOrders() {
    this.ser.getOrders().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  } 

  updateStatus(order: Order): void {
    this.ser.updateOrderStatus(order.orderId, order).subscribe({
      next: () => {
        this.snackBar.open(`Order ${order.orderId} status updated to ${order.status}`, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'right',
          verticalPosition: 'top'

        });
      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.snackBar.open('Failed to update order status. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  
  applyFilter(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.updateFilter();
  }
  
  filterByStatus(status: string) {
    this.selectedStatus = status.trim().toLowerCase();
    this.updateFilter();
  }
  
  updateFilter() {
    this.dataSource.filter = JSON.stringify({
      searchText: this.searchText,
      status: this.selectedStatus
    });
  }




}

