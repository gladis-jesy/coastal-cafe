import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{HomePageComponent} from './module/user-view/home-page/home-page.component'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'coastal-cafe';
}
