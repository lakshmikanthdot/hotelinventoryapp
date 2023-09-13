import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements OnInit {
  // @Input() color: string = 'red';
  // geeting values from parent and can use the Input name as Selector and change appHover="yellow"
  @Input() appHover: string = 'red';

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private doc: Document,
    private renderer: Renderer2
  ) {
    console.log(element.nativeElement);
  }
  ngOnInit(): void {
    // 1st method
    // this.element.nativeElement.style.background = this.color;
    // to access the document
    console.log(this.doc);
    // 2nd method
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      // this.color
      this.appHover
    );
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    );
  }
}
