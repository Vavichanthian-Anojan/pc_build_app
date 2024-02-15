import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  constructor(private http: HttpClient) {}

  addBuild(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/build', data);
  }

  updateBuild(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/build/${id}`, data);
  }

  getBuild(): Observable<any> {
    return this.http.get('http://localhost:3000/build');
  }

  deleteBuild(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/build/${id}`);
  }
}
