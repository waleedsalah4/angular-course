import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  add = output<{ title: string; text: string }>();

  // 1-//
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  //2-// private form = viewChild<ElementRef<HTMLFormElement>>('form');
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  //access an el
  // ement in the template with template reference variable
  ngOnInit() {
    console.log('ONINIT');
    console.log(this.form?.nativeElement);
    // I'm not guaranteed that this element exists yet.
  }

  /*
    if you're using the view child function.
    There, you can actually also read it here
    inside of Init.
    But when using that decorator
    there is this important difference
    which you should be aware of
    because that difference of course means that if you're using
    that decorator for selecting an element
    and storing it in a property
    and you then wanna do something with that element,
    you can only do so in after view Init
    or any of your methods that are triggered from the template
    but not inside of NgOnInit because there it would still be undefined.
  */

  ngAfterViewInit(): void {
    console.log('ONINIT');
    console.log(this.form?.nativeElement);

    /*in this hook here, you are guaranteed
      to have access to the elements
      that have been selected with view child,
      unless you of course specified some selector
      that can't be found.
      But you are guaranteed
      that the template has been initialized
    */
  }

  onSubmit(titleInput: string, textInput: string) {
    this.add.emit({ title: titleInput, text: textInput });

    //1-//this.form?.nativeElement.reset();
    //2-// this.form()?.nativeElement.reset();
    this.form?.nativeElement.reset();
  }
}
