import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWine } from 'src/app/types/wine';
import { ApiService } from '../api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wine-all',
  templateUrl: './wine-all.component.html',
  styleUrls: ['./wine-all.component.css']
})
export class WineAllComponent implements OnInit, OnDestroy {
  wines: IWine[] = [];
  isLoading: boolean = true;
  subscription$!: Subscription;
  errorMessage?: string;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.subscription$ = this.apiService.getAllWines().subscribe({
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
