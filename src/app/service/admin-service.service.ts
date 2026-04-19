import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface IAdmin
{
  username:String;
  password:String;
}
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiurl=`${API_BASE_URL}/admin`;
  
  constructor(private http:HttpClient) { }

  login(admin:IAdmin):Observable<IAdmin>
  {
    return this.http.post<IAdmin>(`${this.apiurl}/login`,admin);
  }
}
