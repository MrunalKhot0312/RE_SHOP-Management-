import { Component } from '@angular/core';
//import { Customer, CustomerServiceService } from '../../../service/customer-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService, ICustomer } from '../../../service/customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customer:ICustomer={
    userType:'CUSTOMER',
    name: '',
    address: '',
    city: '',
    mobile: 0,
    email: '',
    password: '',
    state: '',
    pincode: 0,
    username: ''
  }

  error='';

  constructor(private service:CustomerService){
  }

  save(){
     this.service.register(this.customer).subscribe({
      next:(res:ICustomer)=>{
          alert("Resgisted...!!!");
      },
      error:(err)=>{
       this.error = err.error||err.message ||  "Resgitrration Failed";
       console.error("Error while regsiter",err);
      }
     })
  }
}