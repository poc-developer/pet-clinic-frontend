import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchDataService } from '../fetch-data.service';
import { Iowner } from '../owner';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { ResponseService } from '../response.service';

type OwnerResponseBody = Iowner[] | { message: string };

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  owners: Iowner[] = [];
  allOwners: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fetchDataService: FetchDataService,
    private responseService: ResponseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name === 'all') {
      this.allOwners = true;
      this.fetchDataService.getOwners().subscribe({
        next: (response: HttpResponse<OwnerResponseBody>) => {
          if (response.status === 200) {
            this.owners = response.body as Iowner[];
          } else {
            this.handleErrorResponse(response);
          }
        },
        error: (error) => {
          this.handleErrorResponse(error);
        }
      });
    } else {
      this.fetchDataService.getOwnerByLastName(name || '').subscribe({
        next: (response: HttpResponse<OwnerResponseBody>) => {
          if (response.status === 200) {
            this.owners = response.body as Iowner[];
          } else {
            this.handleErrorResponse(response);
          }
        },
        error: (error) => {
          this.handleErrorResponse(error);
        }
      });
    }
  }

  private handleErrorResponse(response: HttpResponse<OwnerResponseBody>): void {
    const statusCode = response.status || 500;
    const message = (response.body as { message: string }).message || 'Internal Server Error';
    this.responseService.setResponse(message, statusCode, {});
    this.router.navigate(['/response']);
  }
}