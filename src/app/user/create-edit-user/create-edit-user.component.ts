import { Component, inject, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { User } from '../../core/models/user.interface';

export interface DialogData {
  isEdit: boolean;
  user: User;
}
@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  public data = inject(MAT_DIALOG_DATA);
  
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
  ) {
    this.form = new FormGroup({
      id: new FormControl<number>(this.data?.user?.id ?? 15),
      name: new FormControl<string>(
        this.data?.user?.name ?? '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(12)],
      ),
      username: new FormControl<string>(
        this.data?.user?.username ?? '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(12)],
      ),
      email: new FormControl<string>(
        this.data?.user?.email ?? '',
        [Validators.required, Validators.email]
      ),
      phone: new FormControl<string>(
        this.data?.user?.phone ?? '',
        [Validators.required, Validators.minLength(8)]
      ),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }
}
