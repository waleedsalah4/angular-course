import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  // constructor(private httpClient: HttpClient)

  ngOnInit() {
    this.isFetching.set(true);

    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        // console.log(places);
        this.places.set(places);
      },
      error: (error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  OnSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

/*
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpsClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  // constructor(private httpClient: HttpClient)

  ngOnInit() {
    this.isFetching.set(true);
    // const subscription = this.httpsClient
    //   .get<{ places: Place[] }>('http://localhost:3000/places', {
    //     observe: 'response',
    //   })
    //   .subscribe({
    //     next: (response) => {
    //the full response
    //       console.log(response.body?.places);
    //     },
    //   });
    const subscription = this.httpsClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(
                'Something went wrong fetching the available places, please try later'
              )
          );
        })
      )
      .subscribe({
        next: (places) => {
          // console.log(places);
          this.places.set(places);
        },
        error: (error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  OnSelectPlace(selectedPlace: Place) {
    this.httpsClient
      .put('http://localhost:3000/user-places', {
        placeId: selectedPlace.id,
      })
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });
  }
}
*/
