import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FindOwnerComponent} from './find-owner/find-owner.component';
import { HomeComponent } from './home/home.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { FormsModule } from '@angular/forms';
import { ResponseComponent } from './response/response.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    FindOwnerComponent, 
    HomeComponent,
    OwnerDetailsComponent, 
    AddOwnerComponent,
    FormsModule,
    ResponseComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PetClinic :: a Spring Framework demonstrationdefault';
}
