import {NgStyle} from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-photo',
  imports: [NgStyle],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
    public src = input.required<string>();
    public description = input.required<string>();
}
