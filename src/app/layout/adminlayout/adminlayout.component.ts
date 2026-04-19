import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent {
  constructor(private router:Router){}

  logout()
  {
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

}
