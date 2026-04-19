import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubCategory } from '../component/admin/subcategory/subcategory.component';
import { API_BASE_URL } from './api.config';
export interface SubCategory {
  id?: number;
  name: string;
  imageurl?: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

   private baseUrl = `${API_BASE_URL}/subcategory`;

  constructor(private http: HttpClient) {}

  
  create(subcategory: SubCategory): Observable<any> {
  return this.http.post(`${this.baseUrl}/create`, subcategory);
}

  
  getAll(): Observable<SubCategory[]> {
  return this.http.get<SubCategory[]>(`${this.baseUrl}/all`);
}

  
  getByCategory(categoryId: number): Observable<SubCategory[]> {
  return this.http.get<SubCategory[]>(
    `${this.baseUrl}/by-category/${categoryId}`
  );
}

  
  update(id: number, data: ISubCategory): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
