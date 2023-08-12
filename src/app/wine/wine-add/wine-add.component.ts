import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wine-add',
  templateUrl: './wine-add.component.html',
  styleUrls: ['./wine-add.component.css']
})
export class WineAddComponent implements OnDestroy {
  @ViewChild('addWineForm') form!: NgForm;
  categories: string[] = [
    'Red Wine',
    'White Wine',
    'Rose'
  ];
  errorMessage: string = '';
  subscription$!: Subscription
  
  uploadMessage: string = 'No file uploaded yet.';
  selectedFile: File | null = null;
  downloadUrl = '';

  private basePath = 'images'

  constructor(private storage: AngularFireStorage, private apiService: ApiService, private router: Router) { }

  onImageSelect(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadImage(event: any): void {
    event.preventDefault();

    if (this.selectedFile) {
      const [name, ext] = this.selectedFile.name.split('.');
      let filePath = `${this.basePath}/${name}_${new Date().getTime()}.${ext}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);
      this.uploadMessage = 'Uploading image...'

      this.subscription$ = uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => {
              this.downloadUrl = url;
              this.uploadMessage = 'Image is successfully uploaded.';
            },
            error: () => {
              this.uploadMessage = 'Image cannot be uploaded. Try again!'
            }
          })
        })
      ).subscribe();
    }
  }

  onAdd() {
    if (this.form.invalid) {
      return;
    }
    
    let {wineName, category, taste, wineDetails} = this.form.value;
    wineName = wineName.trim();
    taste = taste.trim();
    wineDetails = wineDetails.trim();
    const imageUrl = this.downloadUrl;

    this.subscription$ = this.apiService.addWine(wineName, category, imageUrl, taste, wineDetails).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/wines']);
      },
      error: (err) => {
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
