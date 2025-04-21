import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { routes as UserRoutes } from './users/user.routes';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  /*
    Now inside of this guard function you can  inject things if you need access to some service or anything like that for example.
    And you can then perform any logic of your choice in here.
    You can for example, all the work with observables or anything like that because ultimately you should return a boolean in here.
    */
  //ex:
  const shouldGetAccess = Math.random();
  //   if (shouldGetAccess < 0.5) return true;
  if (shouldGetAccess) return true;
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routs: Routes = [
  {
    path: '', // <your-domain>
    component: NoTaskComponent,
    title: 'Home',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: UserRoutes,
    //route guard
    canMatch: [dummyCanMatch],
    data: {
      message: 'hello', //can get this value in the component via input same as query params and dynamic id
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
