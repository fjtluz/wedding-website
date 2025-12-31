import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {ConfirmationService} from './confirmation.service';
import {catchError, throwError} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-presenca',
  imports: [FormsModule, NgClass],
  templateUrl: './presenca.component.html',
  styleUrl: './presenca.component.scss',
})
export class PresencaComponent {

    private confirmationService = inject(ConfirmationService);
    private destroyRef = inject(DestroyRef);

    public guestName = '';
    public willAttend?: boolean = undefined;
    public showModal = false;
    public nameNotFound = false;

    public handleConfirmation() {
        this.nameNotFound = false;

        this.confirmationService.respondeConfirmacao(this.guestName, this.willAttend ?? false)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                catchError(() => {
                    this.nameNotFound = true;
                    return throwError(() => new Error('Convidado não encontrado'));
                })
            )
            .subscribe(() => {
                this.showModal = true;
                this.guestName = '';
                this.willAttend = undefined;
            });
    }

    public closeModal() {
        this.showModal = false;
    }
}
