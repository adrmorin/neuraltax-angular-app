import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRegister } from '../models/user-interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/api/users`;



    registerUser(userRegister: UserRegister): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<User>(`${this.baseUrl}/register`, userRegister, {
            headers,
            withCredentials: true,
        });
    }
}
