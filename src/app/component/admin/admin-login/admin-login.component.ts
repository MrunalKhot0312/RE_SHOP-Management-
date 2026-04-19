import { Component } from '@angular/core';
//import { CommonModule} from "../../../../../node_modules/@angular/common/index";
import { AdminServiceService, IAdmin } from '../../../service/admin-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  loginRequest:IAdmin=
  {
    username:'',
    password:''
  }
  message='';
  isLoading=false;
  constructor(private adminservice:AdminServiceService,private router:Router)
  {

  }
  login()
  {
    this.isLoading=true;
    this.adminservice.login(this.loginRequest).subscribe(
      {
        next:(res:any)=>
        {
          this.isLoading=false
          alert("Login Succesful");
          localStorage.setItem('admin',JSON.stringify(res));
          this.router.navigate(['/admin/dashboard']);
        },
        error:(err)=>{
          this.isLoading=false;
        this.message="Invalid username password"
        console.error("login failed",err);
      }} )
  }
}
