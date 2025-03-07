import { Component, computed, signal } from '@angular/core';
import { PhotoComponent } from "./photo/photo.component";
import {NgStyle} from '@angular/common';

const WEDDING_DAY = new Date(2025, 10, 1, 0, 0, 0, 0);

@Component({
  selector: 'app-home',
  imports: [PhotoComponent, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

    public arabescos = [
        ['-45px', '60px'], 
        ['-110px', '100px'], 
        ['-230px', '50px'], 
        ['-275px', '100px'],
        ['-365px', '80px'],
        ['-450px', '80px'],
        ['-530px', '80px'],
        ['-612px', '80px'],
    ]

    public now = signal(new Date()); 
    public timeTillWedding = computed(() => {
        const nowTime = this.now().getTime();
        const weddingTime = WEDDING_DAY.getTime();

        const difference = weddingTime - nowTime;

        let days = difference / 1000 / 60 / 60 / 24;
        let remainder = days % Math.floor(days);
        days = Math.floor(days);

        let hours = remainder * 24;
        remainder = hours % Math.floor(hours);
        hours = Math.floor(hours);

        let minutes = remainder * 60;
        remainder = minutes % Math.floor(minutes);
        minutes = Math.floor(minutes);

        let seconds = remainder * 60;
        seconds = Math.floor(seconds);

        return `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos.`;
    });

    constructor() {
        setInterval(() => this.now.update(() => new Date()), 1000);
    }
}
