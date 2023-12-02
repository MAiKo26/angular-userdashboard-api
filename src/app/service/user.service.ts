import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  getUsers(size: number = 10): Observable<Response> {
    return this.http
      .get<Response>(`${this.apiUrl}/?results=${size}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  getUser(uuid: string = '1'): Observable<Response> {
    return this.http
      .get<Response>(`${this.apiUrl}/?uuid=${uuid}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            username: user.login.username,
            gender: user.gender,
            address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
            dateOfBirth: user.dob.date,
            phone: user.cell,
            imageUrl: user.picture.medium,
            coordinate: {
              lattitude: +user.location.coordinates.latitude,
              longitude: +user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
