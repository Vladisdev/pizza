import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[coolInput]',
})
export class CoolInputDirective implements OnInit {
  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';
  private _backgroundColor: string = '';
  private _isOnFocus: boolean = false;

  constructor(private el: ElementRef, private rend: Renderer2) {}

  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }

  @HostListener('focus')
  onFocus() {
    this.changeElementBgColor(this.coolInputFocusBgColor);
    this._isOnFocus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this._isOnFocus = false;
  }

  @HostListener('click', ['$event', '$event.target'])
  onClick(event: Event, target: HTMLElement) {
    console.log(event);
    console.log(target);
  }

  ngOnInit() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    // this.el.nativeElement.style.backgroundColor = 'yellow';
    this.rend.setAttribute(
      this.el.nativeElement,
      'placeholder',
      this.el.nativeElement.getAttribute('placeholder') + '*'
    );
  }

  changeElementBgColor(color: string) {
    this._backgroundColor = color;
  }
}
