import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreditCard]'
})
export class CreditCardDirective {
  private el: HTMLInputElement;
  returnStr: string = '';
  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener("input", ["$event.target.value"])
  onKeyDown(value: string) {
    this.returnStr = '';
    if(value.length > 16) {
      const newVal = value.slice(0,15);
      const val = newVal.split("(?=(.{3})+$)");
      for(const item of val) {
        this.returnStr = this.returnStr + ' ' + item;
      }
      this.el.value = this.returnStr;
    }
    else if(value.length > 4) {
      const val = value.split("(?=(.{3})+$)");
      for(const item of val) {
        this.returnStr = this.returnStr + ' ' + item;
      }
      this.el.value = this.returnStr;
    } else {
      this.el.value = value;
    }
    
  }

}
