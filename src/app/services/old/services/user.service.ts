// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// // import { User, UserRegister } from '../models/user-interface';
// import { environment } from '../../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private baseUrl = `${environment.apiUrl}/api/users`; // Cambia según tu backend

//   constructor(private http: HttpClient) { }

//   registerUser(userRegister: UserRegister): Observable<User> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     return this.http.post<User>(`${this.baseUrl}/register`, userRegister, {
//       headers,
//       withCredentials: true, // Solo si estás manejando cookies o sesiones
//     });
//   }

// }
