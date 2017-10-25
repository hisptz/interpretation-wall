import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
  }

  get(url) {
    return new Observable((observer => {
      this.httpClient.get<any>(url)
        .subscribe((responseData) => {
          observer.next(responseData);
          observer.complete();
        }, (error: HttpErrorResponse) => {
          observer.error(this._getError(error));
        });
    }));
  }

  post(url, data) {
    return new Observable((observer => {
      this.httpClient.post<any>(url, data)
        .subscribe((responseData) => {
          observer.next(responseData);
          observer.complete();
        }, (error: HttpErrorResponse) => {
          observer.error(this._getError(error));
        });
    }));
  }

  put(url, data) {
    return new Observable((observer => {
      this.httpClient.put<any>(url, data)
        .subscribe((responseData) => {
          observer.next(responseData);
          observer.complete();
        }, (error: HttpErrorResponse) => {
          observer.error(this._getError(error));
        });
    }));
  }

  delete(url) {
    return new Observable((observer => {
      this.httpClient.delete<any>(url)
        .subscribe((responseData) => {
          observer.next(responseData);
          observer.complete();
        }, (error: HttpErrorResponse) => {
          observer.error(this._getError(error));
        });
    }));
  }

  private _getError(err: HttpErrorResponse) {
    let errorObject = null;
    if (err.error instanceof Error) {

      /**
       * A client-side or network error occurred. Handle it accordingly.
       */
      console.log(err.error.message);
      errorObject = {
        body: err.error
      };
    } else {

      /**
       * The backend returned an unsuccessful response code.
       * The response body may contain clues as to what went wrong,
       */
      errorObject = {
        body: err.error,
        status: err.status
      };
    }
    return errorObject;
  }

}
