import { Component, effect, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";

export type SectionOptions = 'lembre-lembre' | 'fotografo';

@Component({
  templateUrl: './fotos.html',
  styleUrl: './fotos.css',
  imports: [RouterOutlet]
})
export class Fotos {

  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public selectedSection = signal<SectionOptions>('lembre-lembre');

  constructor() {
    effect(() => {
      const section = this.selectedSection();
      this.router.navigate([section], { relativeTo: this.route });
    })
  }


}
