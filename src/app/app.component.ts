import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponentComponent } from './component/admin/category-component/category-component.component';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projectfrontend';
}
