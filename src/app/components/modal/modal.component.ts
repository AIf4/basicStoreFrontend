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

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent {
  //
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl('');
  filteredTags!: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  announcer = inject(LiveAnnouncer);

  productForm!: FormGroup;

  @ViewChild('tagsInput')
  tagsInput!: ElementRef<HTMLInputElement>;
  // flowbite Modal
  @ViewChild('registerModal')
  modalElement!: ElementRef;

  @Input() productsComponent!: ProductsComponent;


  modal!: ModalInterface;

  modalOptions: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: false,
    onHide: () => {
      console.log('modal is hidden');
    },
    onShow: () => {
      console.log('modal is shown');
      this.productForm.reset();
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };



  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      sku: ['', Validators.required],
      imageurl: ['https://picsum.photos/200/300', Validators.required],
      price: [, [Validators.required, Validators.min(0)]],
      stock: [, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getAlltags();
    this.modal = new Modal(this.modalElement.nativeElement, this.modalOptions);
  }

  createProduct() {
    if (this.productForm.valid && this.tags.length) {
      for (const selectTag of this.tags) {
        if (!this.allTags.length) {
          this.registerTag(selectTag);
        } else {
          let findTag = this.allTags.find(
            (item) => item.toLowerCase() === selectTag.toLowerCase()
          );
          if (!findTag) {
            this.registerTag(selectTag);
          }
        }
      }
      this.modal.hide();

      this.productsService
        .getTagsByName(this.tags)
        .subscribe((resultTags: any) => this.registerProduct(resultTags));
    }
  }

  registerTag(selectTag: string) {
    this.productsService
      .createTags({ name: selectTag })
      .subscribe((tag: any) => {
        this.getAlltags();
      });
  }

  registerProduct(tagsId: any) {
    this.productForm.value.tags = tagsId;
    this.productsService
      .createProduct(this.productForm.value)
      .subscribe((resultTags: any) => {
        this.productsComponent.getAllProducts();
      });
  }

  getAlltags() {
    this.productsService
      .getAllTags()
      .subscribe((tags: any) => (this.allTags = tags));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
    this.tagsCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }
}
