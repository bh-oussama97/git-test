import { Directive,ElementRef,Renderer2 ,HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private al : ElementRef,private render: Renderer2
  ) { }

  @HostListener('mouseenter') onMousEnter() {
  this.render.addClass(this.al.nativeElement,'highlight');
  }

  @HostListener('mouseleave') onMouseLeave () 
  {
    this.render.removeClass(this.al.nativeElement,'highlight'  );
  }

}
