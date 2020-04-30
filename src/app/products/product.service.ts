import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http' 
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'// To manage errors

import { IProduct } from './products';


@Injectable({
    providedIn:'root'
})
export class ProductService{
    private productUrl='api/products/products.json'

    constructor( private http:HttpClient){}

    getPoducts(): Observable <IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).
        pipe(
            tap(data => console.log('All ' + JSON.stringify(data))),
            catchError(this.handleError)
        ); // Is necesari make a error handlings to prevent errors 
    }  
    
    private handleError( err: HttpErrorResponse ){
        // in the app of real world, we may send  the server to some remote logging infracstructure
        // instead of just logging it to the console
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            // A client-side or network error occured. Handle it accordingly (We fuck up in some part T.T ) 
            errorMessage = `An error ocurred: ${err.error.message }`
        }else{
            //The backend returned an  unsucessful re sponse code (The Backend supports Fuck up in some part jejeje )
            //The response body may contain clues as to what went wrong 
            errorMessage = `Server returned code: ${err.status}, error message is : ${err.message}`
        }
        console.log(errorMessage);
        return throwError (errorMessage)

    }
}