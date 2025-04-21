import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // request.headers.set('Authorization', 'Bearer waleed');
  const req = request.clone({
    headers: request.headers.set('X-DEBUG', 'TESTING'),
  });
  // console.log(request);
  return next(req);
}

// function loggingInterceptor(
//   request: HttpRequest<unknown>,
//   next: HttpHandlerFn
// ) {
//   // request.headers.set('Authorization', 'Bearer waleed');
//   const req = request.clone({
//     headers: request.headers.set('X-DEBUG', 'TESTING'),
//   });
//   // console.log(request);
//   return next(request).pipe(
//     //intercept response
//     tap({
//       next: (event) => {
//         if (event.type === HttpEventType.Response) {
//           console.log(event.status);
//           console.log(event.body);
//         }
//       },
//     })
//   );
// }

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient()],
// }).catch((err) => console.error(err));
