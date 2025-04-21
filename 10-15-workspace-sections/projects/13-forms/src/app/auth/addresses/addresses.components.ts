import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addresses.component.html',
})
export class AddressesComponent {
  form = new FormGroup({
    addresses: new FormArray([
      this.createAddressGroup(), // Initialize with one address
    ]),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
  });

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  createAddressGroup(): FormGroup {
    return new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Triggers validation display
      console.log('Invalid Form');
      return;
    }
    console.log(this.form.value);
  }

  onReset() {
    // Reset to initial state with one address
    this.form.reset();
    while (this.addresses.length > 1) {
      this.addresses.removeAt(1);
    }
  }
}
