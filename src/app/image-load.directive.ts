import { Directive, Output, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appImageLoad]'
})
export class ImageLoadDirective {

  @Output() loaded = new EventEmitter();

  @HostListener('load')
  onLoad() {
    this.loaded.emit();
  }

  constructor(private elRef: ElementRef<HTMLImageElement>) {
    if (this.elRef.nativeElement.complete) {
      this.loaded.emit();
    }
  }

}
