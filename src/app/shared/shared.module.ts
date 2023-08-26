import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './sub-modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { RtlDirective } from './directives/rtl/rtl.directive';
import { SpecificLanguageValidatiorDirective } from './directives/validators/specific-language-validator/specific-language-validatior.directive';

import { ValidationHandlerPipe } from './pipes/validation-handler.pipe';

import { EmptyScreenComponent } from './components/empty-screen/empty-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AdminDirective } from './directives/secure/admin.directive';
import { AuthDirective } from './directives/secure/auth.directive';

@NgModule({
  declarations: [
    ValidationHandlerPipe,
    RtlDirective,
    SpecificLanguageValidatiorDirective,
    LoadingComponent,
    EmptyScreenComponent,
    InputComponent,
    TableComponent,
    ConfirmDialogComponent,
    AdminDirective,
    AuthDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    MaterialModule
  ],
  exports: [
    LoadingComponent,
    EmptyScreenComponent,
    ValidationHandlerPipe,
    RtlDirective,
    SpecificLanguageValidatiorDirective,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    InputComponent,
    TableComponent,
    ConfirmDialogComponent,
    AdminDirective,
    AuthDirective
  ]
})
export class SharedModule { }
