import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { APP_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  //change start
private orderData: Order | null = null;

setOrder(order: Order): void {
  this.orderData = order;
}

getOrder(): Order | null {
  return this.orderData;
}

clearOrder(): void {
  this.orderData = null;
}

//end
  placeOrder(order:Order):Observable<any>{
    return this.http.post<any>(`${APP_URL}/orders`,order);
  }

  deleteOrder(id:number):Observable<any>{
    return this.http.delete<any>(`${APP_URL }/orders/${id}`);
  }

  getOrderDetails(orderId:number):Observable<any>{
    return this.http.get<any>(`${APP_URL }/orders/${orderId}`);
  }

  getOrderByUserId(userId:number):Observable<any>{
    return this.http.get<any>(`${APP_URL}/orders/user/${userId}`);
  }

  getOrders():Observable<any>{
    return this.http.get<any>(`${APP_URL}/orders`);
  }

  updateOrderStatus(id:number,order:any):Observable<any>{
    return this.http.put<any>(`${APP_URL}/orders/${id}`,order);
  }
}
