import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-owner',
  standalone: true,
  imports: [],
  templateUrl: './find-owner.component.html',
  styleUrls: ['./find-owner.component.css']
})
export class FindOwnerComponent {
  constructor(private router: Router) { }

  findOwner(lastName: string) {
    this.router.navigate(['/owners', lastName.trim() || 'all']);
  }

  addOwner() {
    this.router.navigate(['/owners/new']);
  }
}
