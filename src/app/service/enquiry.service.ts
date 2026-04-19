import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface IEnquiry {
  name: string;
  email: string;
  mobile: number;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
 private baseurl = "http://localhost:8080/api/enquiry1";

  constructor(private http: HttpClient) {}

  submit(enquiry: IEnquiry): Observable<IEnquiry> {
    return this.http.post<IEnquiry>(this.baseurl, enquiry);
  }

}
