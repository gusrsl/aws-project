import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../interfaces/task';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = 'http://localhost:3004/tasks';

  constructor(private http: HttpClient, private router: Router) { }

  private handleError(error: any): Observable<never> {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL)
      .pipe(catchError(error => this.handleError(error)));
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task)
      .pipe(catchError(error => this.handleError(error)));
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${id}`, task)
      .pipe(catchError(error => this.handleError(error)));
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }
}