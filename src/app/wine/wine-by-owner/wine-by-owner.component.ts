import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWine } from 'src/app/types/wine';
import { ApiService } from '../api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-wine-by-owner',
  templateUrl: './wine-by-owner.component.html',
  styleUrls: ['./wine-by-owner.component.css']
})
export class WineByOwnerComponent {
  wines: IWine[] = [];
  isLoading: boolean = true;
  subscription$!: Subscription;
  errorMessage?: string;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userId(): string | undefined {
    return this.authService.userId;
  }

  ngOnInit(): void {
    this.subscription$ = this.apiService.getByOwnerId(this.userId).subscribe({
      next: (data) => {
        this.wines = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error.error.message;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
