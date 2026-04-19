import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface IProduct {
  id?: number;
  productName: string;
  price: number;
  stock: number;
  available: boolean;

  imageUrl?: string;

subCategoryId: number;
  sellerId: number;

  images?: IProductImage[];
  specifications: ISpecificationDTO[];
  
}
// export interface ISubcategoryDTO{
//  name:string;
//  imageUrl:string;
//  categoryId:number;
// }

export interface ISpecificationDTO{
  name:string;
  description:string;

}
export interface IProductImage {
  imageUrl: string;
  isPrimary: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${API_BASE_URL}/products`;

  constructor(private http: HttpClient) {}

  
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }

  update(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, product);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}