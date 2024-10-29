import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint: string = "localhost:8080/api"

  constructor() { }
}
