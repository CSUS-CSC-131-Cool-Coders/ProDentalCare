import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private server: string = "http://localhost:8080"

  public isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) { }

  private buildEndpoint(relPath: string): string {
    return this.server + relPath;
  }

  private populateDefaultHeaders(headers: HttpHeaders | undefined): HttpHeaders {
    if (headers === undefined) {
      headers = new HttpHeaders();
    }
    return headers;
  }

  public get<T>(endpoint: string, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(this.buildEndpoint(endpoint), {headers: this.populateDefaultHeaders(headers), observe: "response"});
  }

  public post<T>(endpoint: string, body: any|null, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(this.buildEndpoint(endpoint), body, {headers: this.populateDefaultHeaders(headers), observe: "response"});
  }

  public put<T>(endpoint: string, body: any|null, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.httpClient.put<T>(this.buildEndpoint(endpoint), body, {headers: this.populateDefaultHeaders(headers), observe: "response"});
  }

  public static isOk(statusCode: number): boolean {
    return statusCode > 199 && statusCode < 300;
  }

  public static isError(statusCode: number): boolean {
    return statusCode > 399 && statusCode < 500;
  }

  public static isBackendError(statusCode: number): boolean {
    return statusCode > 499;
  }

}
