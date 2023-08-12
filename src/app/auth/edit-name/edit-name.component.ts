import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.css']
})
export class EditNameComponent implements OnInit {
  @ViewChild('editNameForm') form!: NgForm;
  @Input() displayName!: String;
  
  fullName = {
    firstName: '',
    lastName: ''
  }

  constructor(private authService: AuthService, public activeModal: NgbActiveModal) {}
  
  ngOnInit(): void {
    const [ firstName, lastName ] = this.displayName.split(' ');

    this.fullName = {
      firstName,
      lastName
    }
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    const { firstName, lastName } = this.form.value;
    const displayName = `${firstName.trim()} ${lastName.trim()}`;

    this.authService.editName(displayName).subscribe({
      next: () => {
        this.activeModal.close(displayName);
      },
      error: (err) => console.log(err),
    });

  }
}
