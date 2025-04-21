import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'offline' | 'online' | 'unknown'>('online');
  private interval?: ReturnType<typeof setInterval>;

  /*
    Now, if you're using a Signal in a template like I'm doing
    it here in multiple places,
    Angular will automatically set up
    and manage a subscription for you
    and it'll automatically update the template
    whenever the Signal value changes.
    But what if you wanna listen
    to a change in your TypeScript component class?
  */
  // constructor() {
  //   console.log(this.currentStatus());
  // }
  // Angular will not set up a subscription.

  /**
   * 
   *  Angular offers you a special function.
      The effect function,
      which you can execute in your constructor
   */
  constructor() {
    effect(() => {
      //effect allows you to set
      console.log(this.currentStatus());
    });
  }
  /** Angular now does set up a subscription.
  And it it'll automatically clean up that subscription
  if that component should ever get removed from the dorm. */

  ngOnInit() {
    console.log('ON INIT');
    this.interval = setInterval(() => {
      const rnd = Math.random(); //0 - 0.99999999999
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
}

/*

Signal Effects Cleanup Functions

When working with Signal effects, you sometimes might need to perform some cleanup work before the effect function runs again (e.g., to clear some timer or something like that).

Angular's effect() allows you to do that!

It does provide you with an onCleanup hook which you can execute as part of your effect function to define what should happen before the effect code runs the next time:

    effect((onCleanup) => {
      const tasks = getTasks();
      const timer = setTimeout(() => {
        console.log(`Current number of tasks: ${tasks().length}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
*/
