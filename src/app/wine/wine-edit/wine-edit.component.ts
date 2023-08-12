import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wine-edit',
  templateUrl: './wine-edit.component.html',
  styleUrls: ['./wine-edit.component.css']
})
export class WineEditComponent implements OnInit {
  @ViewChild('editWineForm') form!: NgForm;
  categories: string[] = [
    'Red Wine',
    'White Wine',
    'Rose'
  ];

  errorMessage: string = '';
  subscription$!: Subscription
  
  uploadMessage: string = '';
  selectedFile: File | null = null;
  downloadUrl = '';
  wineId!: string;
  wineName!: string;
  categoryDef!: string;
  taste!: string;
  wineDetails!: string;

  private basePath = 'images'

  constructor(
    private storage: AngularFireStorage, 
    private apiService: ApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const wineId = this.activatedRoute.snapshot.params['wineId'];
    this.subscription$ = this.apiService.getSingleWine(wineId).subscribe((data) => {
      this.wineId = data.id;
      this.wineName = data.wineName;
      this.categoryDef = data.category;
      this.downloadUrl = data.imageUrl;
      this.taste = data.taste;
      this.wineDetails = data.wineDetails;
    });

  }
  
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

      const oldPhotoName = this.downloadUrl.split('images%2F')[1].split('?')[0];
      const storageRef = this.storage.ref(this.basePath);
      
      const uploadTask = this.storage.upload(filePath, this.selectedFile);
      this.uploadMessage = 'Uploading image...'
      
      this.subscription$ = uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => {
              storageRef.child(oldPhotoName).delete();
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

  onEdit() {
    if (this.form.invalid) {
      return;
    }

    let { wineName, category, taste, wineDetails } = this.form.value;
    wineName = wineName.trim();
    taste = taste.trim();
    wineDetails = wineDetails.trim();
    const imageUrl = this.downloadUrl;

    this.subscription$ = this.apiService.editWine(this.wineId, wineName, category, imageUrl, taste, wineDetails).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/wines', this.wineId]);
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
