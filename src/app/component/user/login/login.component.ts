import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService, ILogin } from '../../../service/customer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginRequest:ILogin={
email:'',
password:''
}
  error = '';

 

  constructor(private customerservice:CustomerService, private router:Router){}

  login(){
     this.customerservice.login(this.loginRequest).subscribe({
      next:(res:any)=>{

        if(res.userType==='CUSTOMER')
       {console.log(res); // 🔥 check data

      // localStorage.setItem('user', JSON.stringify(res)); // ✅ MUST

          
        localStorage.setItem('user',JSON.stringify(res));
        this.router.navigate(['/customer/home']);
        }
        else if(res.userType==='SELLER')
        {
          localStorage.setItem('user',JSON.stringify(res));
          this.router.navigate(['/seller/home']);
        }
      },
      error:(err)=>{
        alert('login failed: ' +err.message || err.error);
      }
     })
  }
}