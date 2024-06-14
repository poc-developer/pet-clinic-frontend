import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FindOwnerComponent} from './find-owner/find-owner.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { ResponseComponent } from './response/response.component';


export const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'owners/find', component: FindOwnerComponent},
  { path: 'owners/new', component: AddOwnerComponent },
  {path:'owners/:name',component:OwnerDetailsComponent},
  { path: 'response', component: ResponseComponent }
];
