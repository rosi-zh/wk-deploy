import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IWine } from 'src/app/types/wine';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WineDeleteComponent } from '../wine-delete/wine-delete.component';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.css']
})
export class WineDetailsComponent implements OnInit, OnDestroy{
  wine!: IWine;
  isLoading: boolean = true;
  isOwner!: boolean;
  subscription$!: Subscription;
  errorMessage?: string;


  constructor(
    private apiService: ApiService, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
    private modalService: NgbModal
    ) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.getWine();
  }

  getWine():void {
    const wineId = this.activatedRoute.snapshot.params['wineId'];

    this.subscription$ = this.apiService.getSingleWine(wineId).subscribe({
      next: (data) => {
        this.wine = data;
        this.isOwner = this.authService.userId === data.ownerId;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage = err.error.error.message;
      }
    });
  }

  openDeleteModal(): void {
    const modalRef = this.modalService.open(WineDeleteComponent);

    modalRef.componentInstance.wineId = this.wine.id;
    modalRef.componentInstance.wineImage = this.wine.imageUrl.split('images%2F')[1].split('?')[0];;
  }

  ngOnDestroy(): void {
    if(this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
