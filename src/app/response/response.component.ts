import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseService } from '../response.service';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  responseBody: any;
  public statusCode: number = 0;
  requestData: any;

  constructor(private responseService: ResponseService) { }

  ngOnInit() {
    this.responseBody = this.responseService.getResponseBody();
    this.statusCode = this.responseService.getStatusCode();
    this.requestData = this.responseService.getRequestData();
    console.log("Response body: " + this.responseBody + " Status code: " + this.statusCode);
  }
}
