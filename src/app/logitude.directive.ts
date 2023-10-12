import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLogitude]'
})
export class LogitudeDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const numericValue = value.replace(/[^0-9]/g, '');
    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = numericValue.slice(0, 2) + '.' + numericValue.slice(2);
    }
    this.el.nativeElement.value = formattedValue;
  }
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedValue = clipboardData.getData('text');
    const numericValue = pastedValue.replace(/[^0-9]/g, '');
    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = numericValue.slice(0, 2) + '.' + numericValue.slice(2);
    }
    this.el.nativeElement.value = formattedValue;
    event.preventDefault();
  }
}
