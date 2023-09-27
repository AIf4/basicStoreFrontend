import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl('');
  filteredTags!: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];

  productForm!: FormGroup;

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

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
      name: ['Televisor', Validators.required],
      description: ['Televisor de 50 pulgadas ', Validators.required],
      sku: ['TV123', Validators.required],
      imageurl: ['https://picsum.photos/200/300', Validators.required],
      price: [2000000, [Validators.required, Validators.min(0)]],
      stock: [2, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.getAlltags();
  }

  createProduct() {
    if (this.productForm.valid && this.tags.length) {
      for (const selectTag of this.tags) {
        if (!this.allTags.length) {
          this.productsService
            .createTags({ name: selectTag })
            .subscribe((tag: any) => console.log(tag));
        } else {
          if (
            !this.allTags.find(
              (item) => item.toLowerCase() === selectTag.toLowerCase()
            )
          ) {
            this.productsService
              .createTags({ name: selectTag })
              .subscribe((tag: any) => console.log(tag));
          }
        }
      }
      this.productsService.createProduct(this.productForm.value, this.tags);
      this.getAlltags();
    }
  }

  getAlltags() {
    this.productsService.getAllTags().subscribe((tags: any) => {
      this.allTags = tags.map((tag: any) => tag.name);
    });
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

  private _filter(value: string): string[] {
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
