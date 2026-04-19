import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ICustomer } from '../../service/customer.service';

@Component({
  selector: 'app-sellerlayout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './sellerlayout.component.html',
  styleUrl: './sellerlayout.component.css'
})
export class SellerlayoutComponent implements OnInit {
  [x: string]: any;
  user:ICustomer|null=null;
  
  constructor(private router: Router){}
  ngOnInit(): void {
 const store= localStorage.getItem('user');
 this['user']=store? JSON.parse(store):null;
  }
  logout()
  {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  } 

}
