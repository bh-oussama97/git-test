import { Directive,ElementRef,Renderer2 ,HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private al : ElementRef,private render: Renderer2
  ) { }

  @HostListener('mouseenter') onmouseenter() {
  this.render.addClass(this.al.nativeElement,'hightlight'  );
  }

  @HostListener('mouseleave') onmouseleave () 
  {
    this.render.removeClass(this.al.nativeElement,'hightlight'  );
  }

}
