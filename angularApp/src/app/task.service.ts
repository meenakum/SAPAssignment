import { Injectable } from '@angular/core';
import { Task } from './task/models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private ROOT_URL = "http://localhost:3000/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }


  createTask(payload: Object): Observable<Task> {
    return this.httpClient.post<Task>(`${this.ROOT_URL}/createTask`, payload, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getTask(taskval: string): Observable<Task> {
    console.log("taskval", taskval)
    return this.httpClient.get<Task>(`${this.ROOT_URL}/Task/${taskval}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.ROOT_URL}/AllTasks`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateTask(taskval: string, payload: Object): Observable<Task> {
    return this.httpClient.put<Task>(`${this.ROOT_URL}/Task/update/${taskval}`, JSON.stringify(payload), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  patchTask(taskval: string, payload: Object): Observable<any> {
    return this.httpClient.put<Task>(`${this.ROOT_URL}/Task/patch/${taskval}`, JSON.stringify(payload), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteTask(taskval: string) {
    return this.httpClient.delete<Task>(`${this.ROOT_URL}/Task/delete/${taskval}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error) {
    console.log("error", error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
