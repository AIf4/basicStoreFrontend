import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  Input,
  EventEmitter,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// AngularMaterial
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// Flowbite
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
// rxjs
import { Observable, map, startWith } from 'rxjs';
// Services
import { ProductsService } from 'src/app/products/services/products.service';
import { ProductsComponent } from 'src/app/products/products.component';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class EditModalComponent extends ModalComponent {
  //
  @Input() flatEdit: boolean = false;

  @Input() dataEdit!: {};

  edit(){
    console.log(this.dataEdit)
  }
}
