import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Stock } from "../model/stock";
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
    
    private REST_API_SERVER = "http://localhost:3000"; // Fake API với JSON Server
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {}

    postStock(body: any): Observable<any> {
        return this.http.post('http://localhost:3000/stocks', body); 
    }
    public getStocks(): Observable<Stock[]> {
        return this.http.get<Stock[]>(`${this.REST_API_SERVER}/stocks`);
    }

    public getStockById(id: string): Observable<Stock> {
        return this.http.get<Stock>(`${this.REST_API_SERVER}/stocks/${id}`);
    }

    public addStock(stock: Stock): Observable<Stock> {
        return this.http.post<Stock>(`${this.REST_API_SERVER}/stocks`, stock, this.httpOptions);
    }

    public updateStock(id: string, stock: Stock): Observable<Stock> {
        return this.http.put<Stock>(`${this.REST_API_SERVER}/stocks/${id}`, stock, this.httpOptions);
    }

    public deleteStock(id: string): Observable<void> {
        return this.http.delete<void>(`${this.REST_API_SERVER}/stocks/${id}`, this.httpOptions);
    }

    // ================== USER API ================== //
    private USERS_API = `${this.REST_API_SERVER}/users`;

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.REST_API_SERVER}/users`);
    }    

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.REST_API_SERVER}/users`, user, this.httpOptions);
    }     

    public getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.USERS_API}/${id}`);
    }

    public updateUser(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.USERS_API}/${id}`, user, this.httpOptions);
    }

    public deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.USERS_API}/${id}`, this.httpOptions);
    }
}
