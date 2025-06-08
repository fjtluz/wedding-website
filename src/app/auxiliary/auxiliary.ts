import { InjectionToken, signal, WritableSignal } from '@angular/core';

const CONFIRMATION_NAMES_TOKEN = new InjectionToken<WritableSignal<string[]>>("confirmation_names");
const confirmationNames = signal<string[]>([]);

