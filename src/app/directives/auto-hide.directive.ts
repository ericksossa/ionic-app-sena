import { Directive, Renderer, ElementRef, OnInit } from '@angular/core';
import { IonFab, IonFabButton } from '@ionic/angular';


@Directive({
  selector: '[appAutoHide]',
  host: {
    '(ionScroll)': 'logScrolling($event)'
  }
})
export class AutoHideDirective implements OnInit {

  fabToHide: any;
  oldScrollTop = 0;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef) { }

  ngOnInit() {
    let htmlEle: HTMLElement = this.elementRef.nativeElement;
    this.fabToHide = htmlEle.querySelector('ion-fab');
    this.renderer.setElementStyle(this.fabToHide, 'webkitTransition', 'transform 500ms opacity ');
  }

  logScrolling(e) {
    // logica del fab hide
    let htmlEle: HTMLElement = this.elementRef.nativeElement;
    let fab = htmlEle.querySelector('ion-fab-button');
    if (e.detail.scrollTop - this.oldScrollTop > 10) {
      this.renderer.setElementStyle(this.fabToHide, 'z-index', '-1');
      this.renderer.setElementStyle(this.fabToHide, 'webkitTransition', 'scaled3d(.1,.1,.1)');
      fab.disabled = true;
    } else if (e.detail.scrollTop - this.oldScrollTop < 0) {
      this.renderer.setElementStyle(this.fabToHide, 'z-index', '1');
      this.renderer.setElementStyle(this.fabToHide, 'webkitTransition', 'scaled3d(1,1,1)');
      fab.disabled = false;
    }
    this.oldScrollTop = e.detail.scrollTop;
  }

}
