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

    public isLoggedIn(): boolean {
        return this.getUserToken() != null;
    }
    public userRoles: string[] = [];
    public userReady: boolean = false;

    constructor(private httpClient: HttpClient,
                private router: Router) {
        if (this.userRoles.length == 0 && this.getUserToken() != null) {
            this.requestUserRoles();
        }
    }

    public getVisitRecords(): Observable<any> {
        return this.get('/patient/records/visit');
    }
    
    public getAllergyRecords(): Observable<any> {
        return this.get('/patient/records/allergy');
    }
    
    public getMedicationRecords(): Observable<any> {
        return this.get('/patient/records/medication');
    }
    
    public getLabRecords(): Observable<any> {
        return this.get('/patient/records/lab');
    }
    
    public getImmunizationRecords(): Observable<any> {
        return this.get('/patient/records/immunization');
    }
    

    private getUserToken(): string|null {
        return localStorage.getItem(DentalConstants.TOKEN_STORAGE_ID);
    }

    private setUserToken(token: string) {
        localStorage.setItem(DentalConstants.TOKEN_STORAGE_ID, token);
    }

    private clearUserToken() {
        localStorage.removeItem(DentalConstants.TOKEN_STORAGE_ID);
    }

    private setUserRoles(roles: string[]) {
        localStorage.setItem(DentalConstants.ROLE_STORAGE_ID, JSON.stringify(roles));
    }

    public getUserRoles(): string[] {
        let roles = localStorage.getItem(DentalConstants.ROLE_STORAGE_ID);
        if (roles != null)
            return JSON.parse(roles);
        return [];
    }

    private buildEndpoint(relPath: string): string {
        return this.server + relPath;
    }

    private populateDefaultHeaders(headers: HttpHeaders | undefined): HttpHeaders {
        if (headers === undefined || headers == null) {
            headers = new HttpHeaders();
        }

        if (this.getUserToken() != null) {
            headers = headers.set("Authorization", "Bearer " + this.getUserToken());
            console.log("Set auth header");
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
        this.clearUserToken();
        this.userRoles = [];
        this.userReady = false;
        this.router.navigateByUrl("/");
    }

    public setLoginToken(token: any): void {
        this.setUserToken(token);
        this.requestUserRoles();
        this.router.navigateByUrl("/");
    }

    public requestUserRoles(): void {
        this.get<any|null>("/roles").subscribe({
            next: res => {
                let body: any = res.body;
                if (body != null) {
                    this.setUserRoles(body.roles != null ? body.roles : []);
                } else {
                    this.setUserRoles([]);
                }

                this.userReady = true;
            },
            error: err => {
                this.setUserRoles([]);
                this.userReady = true;
            }
        });
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
