import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
export interface Category {
  id?: number;
  name: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
[x: string]: any;
  
private baseurl=`${API_BASE_URL}/category`;
constructor(private http:HttpClient)
{
}
getAll():Observable<Category[]>{
  return this.http.get<Category[]>(this.baseurl);

}
add(category:Category):Observable<Category>{
  return this.http.post<Category>(this.baseurl,category);
}
update(id:number,category:Category):Observable<Category>{
  return this.http.put<Category>(`${this.baseurl}/${id}`,category);
}
delete(id:number):Observable<void>{
  return this.http.delete<void>(`${this.baseurl}/${id}`);


}

getByCategory(categoryId: number) {
  return this.http.get(`http://localhost:8080/api/subcategory/by-category/${categoryId}`);
}
}
