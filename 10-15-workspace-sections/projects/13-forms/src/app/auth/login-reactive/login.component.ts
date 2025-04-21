import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }

  return of({ noUnique: true });
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedFormData = JSON.parse(savedForm);
  initialEmailValue = loadedFormData.email;
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponentReactive implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    // email: new FormControl('', {
    //   validators: [Validators.email, Validators.required],
    //   asyncValidators: [emailIsUnique],
    // }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl(initialEmailValue, {
      validators: [
        Validators.minLength(6),
        Validators.required,
        mustContainQuestionMark,
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }
  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    /*
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedFormData.email,
      });
    }*/
    const subscription = this.form.valueChanges
      ?.pipe(debounceTime(500))
      .subscribe({
        next: (value) =>
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          ),
      });
    this.destroyRef.onDestroy(() => {
      subscription?.unsubscribe();
    });
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}

/*
you can also register async validators
and an async validator is in the end also just a function
that gets a control as an input,
but it's then a function that must return an observable.
And this allows you to do things
like send an HTTP request to a backend
to check whether an email address
already was registered there or not, for example.
In the end, the observable should then yield null
if the input is considered valid
or an error object as we did it here,
if it's considered invalid,

*/
