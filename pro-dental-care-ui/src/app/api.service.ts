import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {DentalConstants} from "./dental-constants";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private server: string = "http://localhost:8080"

    public isLoggedIn: boolean = false;
    public userToken: any = null;
    public userRoles: string[] = [];
    public userReady: boolean = false;

    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

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
        return this.httpClient.get<T>(this.buildEndpoint(endpoint), {
            headers: this.populateDefaultHeaders(headers),
            observe: "response"
        });
    }

    public post<T>(endpoint: string, body: any | null, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.post<T>(this.buildEndpoint(endpoint), body, {
            headers: this.populateDefaultHeaders(headers),
            observe: "response"
        });
    }

    public put<T>(endpoint: string, body: any | null, headers?: HttpHeaders): Observable<HttpResponse<T>> {
        return this.httpClient.put<T>(this.buildEndpoint(endpoint), body, {
            headers: this.populateDefaultHeaders(headers),
            observe: "response"
        });
    }

    public logout(): void {
        this.isLoggedIn = false;
        this.userToken = null;
        this.userRoles = [];
        this.userReady = false;
        this.router.navigateByUrl("/");
    }

    public setLoginToken(token: any): void {
        this.isLoggedIn = false;
        this.userToken = token;
        this.requestUserRoles();
        this.router.navigateByUrl("/");
    }

    public requestUserRoles(): void {
        let headers = new HttpHeaders();
        headers.set("Authorization", this.userToken);
        this.get("/roles", headers).subscribe({
            next: res => {
                let body: any = res.body;
                if (body != null) {
                    this.userRoles = body.roles != null ? body.roles : [];
                } else {
                    this.userRoles = [];
                }

                this.userReady = true;
            },
            error: err => {
                this.userRoles = [];
                this.userReady = true;
            }
        });
    }

    public getUserRoles(): string[] {
        return this.userRoles;
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
