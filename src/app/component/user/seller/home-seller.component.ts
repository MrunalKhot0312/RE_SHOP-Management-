import { Component } from '@angular/core';
import { CustomerService, ICustomer } from '../../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home-seller.component.html',
  styleUrl: './home-seller.component.css'
})
export class SellerComponent {
  //[x: string]: any;
  seller :ICustomer ={
    userType:'SELLER',
    name:'',
    email:'',
    mobile:0,
    address:'',
    city:'',
    state:'',
    pincode:0,
    username:'',
    password:''
  };
  error = '';

  constructor(private customerService:CustomerService){}
   save(){
     this.customerService.register(this.seller).subscribe({
      next:(res:ICustomer)=>{
          alert("Resgisted...!!!");
      },
      error:(err)=>{
       this.error= err.error||err.message ||  "Resgitrration Failed";
       console.error("Error while regsiter",err);
      }
     })
  }

}
