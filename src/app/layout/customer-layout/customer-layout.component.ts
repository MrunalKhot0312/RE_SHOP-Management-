import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../service/customer.service';
import { RouterOutlet, RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent implements OnInit {
  [x: string]: any;
  user:ICustomer|null=null;
  constructor(private router: Router){}
  ngOnInit(): void {
 const store= localStorage.getItem('user');
 this.user=store? JSON.parse(store):null;
  }
  logout()
  {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
