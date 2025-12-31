import { Component, computed, effect, input, signal } from "@angular/core";
import { SectionOptions } from "../fotos";
import { Directive, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appMasonryItem]',
  standalone: true
})
export class MasonryItemDirective implements AfterViewInit, OnDestroy {
  private observer?: ResizeObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new ResizeObserver(() => {
      this.calculateSpan();
    });

    // Observe the inner content div
    const content = this.el.nativeElement.querySelector('.content');
    if (content) {
      this.observer.observe(content);
    }

    // Also trigger on image load to be safe
    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      img.addEventListener('load', () => this.calculateSpan());
    }
  }
  private calculateSpan() {
    const item = this.el.nativeElement;
    const container = item.parentElement;
    if (!container) return;

    const rowHeight = 10;
    const gap = parseInt(window.getComputedStyle(container).getPropertyValue('row-gap')) || 16;

    const content = item.querySelector('.content');
    if (content) {
      const contentHeight = content.scrollHeight; // Use scrollHeight for accuracy
      // The formula should account for the fact that the gap is between spans
      const span = Math.ceil((contentHeight + gap) / (rowHeight + gap));
      item.style.gridRowEnd = `span ${span}`;
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}

@Component({
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
  imports: [MasonryItemDirective]
})
export class Galeria {

  fotoGroup = input.required<SectionOptions>();
  range = input.required<[number, number]>();

  fotoIdList = computed(() => Array(this.range()[1] - this.range()[0]).fill(0).map((_, index) => index + this.range()[0]));

  selectedPhoto = signal<number>(0);

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.selectedPhoto() === 0) return;

    if (event.key === 'ArrowRight') this.goToNextPhoto(event);
    if (event.key === 'ArrowLeft') this.goToPreviousPhoto(event);
    if (event.key === 'Escape') this.closeModal();
  }

  closeModal() {
    this.selectedPhoto.set(0);
  }

  goToPreviousPhoto(event: Event) {
    event.stopPropagation();

    this.selectedPhoto.update((curr) => curr === this.range()[0] ? this.range()[1] : curr - 1);
    console.log(this.selectedPhoto());
  }

  goToNextPhoto(event: Event) {
    event.stopPropagation();
    this.selectedPhoto.update((curr) => curr === this.range()[1] ? this.range()[0] : curr + 1);
  }

  handleKeyPress(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'ArrowLeft') {
      this.goToPreviousPhoto(event);
    } else if (event.key === 'ArrowRight') {
      this.goToNextPhoto(event);
    } else if (event.key === 'Esc') {
      this.closeModal();
    }
  }

}
