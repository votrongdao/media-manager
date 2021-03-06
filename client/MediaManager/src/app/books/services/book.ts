import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';
import 'rxjs';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BookService {
    private API_PATH: string = '';

    constructor(private http: Http) {

    }

    loadBooks() : Observable<any> {
        return this.http.get("http://145.131.17.225/api/books")
        .map(res => res.json());
    }

    addBook(book: Book) : Observable<any> {
        let newBook = Object.assign({}, book);

        return this.http.post('http://145.131.17.225/api/books', newBook).map(res => res.json());
    }

    postImage(file) {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        headers.append('Accept', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://145.131.17.225/api/images?directory=books', formData, options).map(res => res.json());
  }

}

