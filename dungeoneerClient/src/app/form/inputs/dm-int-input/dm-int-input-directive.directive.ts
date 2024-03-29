import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[dmIntInputDirective]'
})
export class DmIntInputDirectiveDirective {  

  private abstractControl: any;

  constructor(private elementRef: ElementRef, private ngControl: NgControl) {
  }

  get value(): any {
    return this.elementRef.nativeElement.value;
  }

  ngOnInit() {
    this.abstractControl = this.ngControl?.control;

    this.abstractControl?.valueChanges?.subscribe(() => {
      this.handleValue();
    });
    

    this.handleValue();
  }

  handleValue() {
    // the cursorPos schennanigans are necessary to keep the cursor in the right place when someone types the wrong type of character
    let numValue = String(this.ngControl.value) || '';
    let cursorPos = this.elementRef.nativeElement.selectionStart;
    // remove anything that isn't a digit
    const cleanedValue = numValue.replace(/[^0-9]/g, '');

    if (this.abstractControl && cleanedValue !== numValue) {
      this.abstractControl.setValue(cleanedValue);
      cursorPos--;
    }

    this.elementRef.nativeElement.setSelectionRange(cursorPos, cursorPos);
  }

}
