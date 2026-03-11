import { Component, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-burger',
  imports: [],
  standalone: true,
  templateUrl: './burger.html',
  styleUrl: './burger.css',
})
export class Burger {
  @Input({ required: true }) isOpenSignal!: WritableSignal<boolean>;

  handleOpen() {
    this.isOpenSignal.update(isOpen => !isOpen);
  }
}
