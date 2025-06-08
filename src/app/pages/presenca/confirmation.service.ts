import {HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    
    private http = inject(HttpClient);

    public respondeConfirmacao(guest_name: string, will_attend: boolean) {
        return this.http.post('http://meumatrimonio.com.br:8000/confirmation', 
            {
                guest_name,
                will_attend
            });
    }
}
