import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly http = inject(HttpClient)

  showImage(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }
}
