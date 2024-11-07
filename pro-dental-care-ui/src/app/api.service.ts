import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private server: string = "http://localhost:8080/api"

  constructor(private httpClient: HttpClient) { }

  private buildEndpoint(relPath: string): string {
    return this.server + relPath;
  }

  private populateDefaultHeaders(headers: HttpHeaders | undefined): HttpHeaders {
    if (headers === undefined) {
      headers = new HttpHeaders();
    }
    return headers.append("Access-Control-Allow-Origin", "*")
      .append("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
      .append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

}
