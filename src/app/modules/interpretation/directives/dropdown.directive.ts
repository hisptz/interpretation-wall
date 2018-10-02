import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleDropdow(){
    this.isOpen = !this.isOpen
  }
  constructor() { }

}
