import {
  Component,
  contentChild,
  ElementRef,
  // HostBinding,
  // HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
// host element is <app-control /> rendered in the dom
export class ControlComponent {
  // @HostBinding('class') className='control';
  // @HostListener ('click') onClick(){
  //   console.log('Clicked');
  // }
  label = input.required<string>();
  private el = inject(ElementRef); // get access to host element programmatically

  //get Access ti the projected elements
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input'); //input is the template reference variable in the element

  onClick() {
    console.log('clicked');
    console.log(this.control());
  }
}
