import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavbarShrink]'
})
export class NavbarShrinkDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.navbarShrink(); // Shrink the navbar on initial load
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.navbarShrink(); // Shrink the navbar on scroll
  }

  private navbarShrink() {
    const navbarCollapsible = this.el.nativeElement;
    if(!navbarCollapsible) {
      return;
    }

    if(window.scrollY === 0) {
      this.renderer.removeClass(navbarCollapsible, 'navbar-shrink');
    } else {
      this.renderer.addClass(navbarCollapsible, 'navbar-shrink');
    }
  }
}
