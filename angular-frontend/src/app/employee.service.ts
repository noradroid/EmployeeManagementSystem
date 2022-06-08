import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = "http://localhost:8080/api/v1/employees";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl, this.httpOptions).pipe(
      tap(_ => this.log(`fetched employees`)),
      catchError(this.handleError<Employee[]>('getEmployeeList()'))
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Employee>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched employee ${id}`)),
      catchError(this.handleError<Employee>('getEmployeeById'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(error);
      this.log(`${operation} failed`);
      return of(result as T);
    }
  }
}
