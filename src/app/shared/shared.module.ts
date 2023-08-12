import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { MatchPasswordsDirective } from './validators/match-passwords.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    EmailDirective,
    MatchPasswordsDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    EmailDirective,
    MatchPasswordsDirective
  ]
})
export class SharedModule { }
