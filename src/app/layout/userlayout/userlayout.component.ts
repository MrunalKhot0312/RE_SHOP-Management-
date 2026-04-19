import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-userlayout',
  standalone: true,
  imports: [RouterOutlet,RouterModule,RouterLink],
  templateUrl: './userlayout.component.html',
  styleUrl: './userlayout.component.css'
})
export class UserlayoutComponent {
  constructor(private router:Router)
  {}
  @HostListener('window:keydown',['$event'])
  handleShortcut(event:KeyboardEvent)
  {

    if( event.altKey && event.key.toLowerCase()==='a')
    {
      console.log('shortcut triggered');
      this.router.navigate(['admin/login']);
    }
  }
}
