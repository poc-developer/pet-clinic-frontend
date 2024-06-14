import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostOwnerDataService } from '../post-owner-data.service';
import { FormsModule } from '@angular/forms';
import { INewOwner } from '../new-owner';
import { ResponseService } from '../response.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-owner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent {
  formSubmitted = false;

  usermodel: INewOwner = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: ''
  };

  constructor(
    private postOwnerDataService: PostOwnerDataService,
    private responseService: ResponseService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.postOwnerDataService.addOwner(this.usermodel).subscribe((response: HttpResponse<any>) => {
        const statusCode = response.status;
        const responseBody = response.body;
        this.responseService.setResponse(responseBody, statusCode, this.usermodel);
        this.router.navigate(['/response']);
        console.log("Response body: " + responseBody + " Status code: " + statusCode);
      });
    }
  }
}
