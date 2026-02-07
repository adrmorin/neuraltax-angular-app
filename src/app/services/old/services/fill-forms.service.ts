import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FillFormsService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/api/forms`;

    sendTaxDeclaration(taxData: Record<string, unknown>): Observable<Blob> {
        console.log('📤 Enviando formulario al Backend...', taxData);
        return this.http.post(`${this.baseUrl}/generate-pdf`, taxData, {
            responseType: 'arraybuffer', // Para recibir binarios
            observe: 'response', // Para acceder a los headers y cuerpo
        }).pipe(
            map((response) => {
                const contentType = response.headers.get('Content-Type');
                if (contentType?.includes('application/pdf') && response.body) {
                    return new Blob([response.body], { type: 'application/pdf' });
                }
                throw new Error('La respuesta no contiene un PDF válido');
            })
        );
    }
}
