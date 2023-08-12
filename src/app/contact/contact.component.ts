import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../wine/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('contactForm') form!: NgForm;
  subscription$?: Subscription;
  isSubmitted: boolean = false;
  sendResult: boolean = false;
  isLoading: boolean = true;
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  onSend() {
    if (this.form.invalid) {
      return;
    }

    const { name, email, phone, message } = this.form.value;

    this.subscription$ = this.apiService.logMessage(name, email, phone, message).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.sendResult = true;
        this.form.reset();
      },
      error: () => {
        this.isSubmitted = true;
        this.sendResult = false;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
