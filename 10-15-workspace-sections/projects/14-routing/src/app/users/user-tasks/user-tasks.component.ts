import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  //1-  //userId = input.required<string>(); //you can get this dynamic url segment with input by adding 'withComponentInputBinding' to you providerRouter in app.config.ts
  private userService = inject(UsersService);

  // useName = computed(
  //   () => this.userService.users.find((u) => u.id === this.userId())?.name
  // );

  //2-
  /*
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  userName = '';

  //access the dynamic url segment without the input signal
  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        (this.useName =
          this.userService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || ''),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }*/

  //3-
  userName = input.required<string>(); // get via resolver function

  //4-
  // private activatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => console.log(data), //will give you both the static data and dynamic data added in the route options
  //   });

  //   //clear subscription
  // }
}

/*
this resolver function will be re executed
every time the route parameter changes.
So therefore we don't have to set up a subscription
or anything like that here.
Instead it will be re executed automatically by Angular
whenever we load a different user.

*/

//add this to resolve object in the app.route and the user name will be available to the component as an input property also withComponentInputBinding should be configured
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks"; // max's tasks
};

/*
Extracting Dynamic Route Parameters via @Input()

You don't have to extract dynamic route parameters via signal-based inputs - you can also use @Input()-based inputs!

To do this, you can define the input like this:

    @Input({required: true}) userId!: string;

You can then use this input in any way needed - for example inside of a getter function.

If you want to run some code whenever the input value changes, you can also define an extra setter function that contains the to-be-executed code. Like this:

    @Input()
    set userId(uid: string) {
      console.log(uid);
    }

*/
