import {bootstrap, Component, Directive, Attribute, ElementRef, View, NgIf, Inject, Observable} from 'angular2/angular2'

declare var componentHandler: any;

@Directive({
  selector: '[upgrade]'
})
export class Upgrade {
  constructor(el: ElementRef, @Attribute("upgrade") upgrade: string) {
    componentHandler.upgradeElement(el.nativeElement, upgrade);
  }
}