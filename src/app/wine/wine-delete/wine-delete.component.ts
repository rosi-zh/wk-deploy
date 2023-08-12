import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-wine-delete',
  templateUrl: './wine-delete.component.html',
  styleUrls: ['./wine-delete.component.css']
})
export class WineDeleteComponent implements OnDestroy {
  @Input() wineId!: string;
  @Input() wineImage!: string;

  subscription$?: Subscription;
  errorMessage: string = '';

  constructor(
    private apiService: ApiService, 
    private storage: AngularFireStorage, 
    private router: Router,
    public activeModal: NgbActiveModal,
    ) {}

  deleteWine() {
    const storageRef = this.storage.ref('/images');
    this.subscription$ = this.apiService.deleteWine(this.wineId).subscribe({
      next: () => {
        storageRef.child(this.wineImage).delete();
        this.activeModal.close();
        this.router.navigate(['/wines']);
      }, 
      error: (err) => {
        const errorMessage = err.error.error.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
