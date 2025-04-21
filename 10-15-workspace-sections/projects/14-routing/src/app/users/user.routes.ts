import { Routes } from '@angular/router';

import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks', //in case user visits <your-domain>/users/<uid> without task redirect them
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks,
    component: TasksComponent,
    //in case you added any resolvers here that will do some work based on query params you need to add this
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
