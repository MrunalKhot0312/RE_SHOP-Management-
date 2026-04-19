import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICustomer{
  Id?:number;
  userType:string;
  name:string;
  email:string;
  mobile:number;
  address:string;
  city:string;
state:string;
 pincode:number;
 username:string
  password:string;
 


}

export interface ILogin{
  email: string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiurl = `${API_BASE_URL}/users`;

  constructor(private http:HttpClient){}

  register(customer:ICustomer):Observable<ICustomer>{
    return this.http.post<ICustomer>(`${this.apiurl}/register`,customer);
  }

  login(request:ILogin):Observable<ICustomer>{
    return this.http.post<ICustomer>(`${this.apiurl}/login`,request);
  }

}