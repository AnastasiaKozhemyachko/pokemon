import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, fromEvent} from "rxjs";

@Directive({
  selector: '[appEndScroll]',
  standalone: true,
})
export class EndScrollDirective implements OnInit {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() threshold = 120;

  private window!: Window;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.window = window;
    fromEvent(this.window, 'scroll').pipe(
      debounceTime(200)
    ).subscribe(() => this.windowScrollEvent());
  }

  private windowScrollEvent() {
    const { scrollHeight: pageHeight } = this.window.document.documentElement;
    const { scrollHeight: elementHeight } = this.el.nativeElement;
    const { scrollY, innerHeight } = this.window;

    const remainingScroll = elementHeight - innerHeight - scrollY + (pageHeight - elementHeight);

    if (remainingScroll < this.threshold) {
      this.nearEnd.emit();
    }
  }
}
