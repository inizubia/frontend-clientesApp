import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  private httpHeader = new HttpHeaders({'Conten-Type': 'application/json'});

  constructor(private http: HttpClient,
  private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndpoint).pipe(
      map( (response) => response as Cliente[])
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeader}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
