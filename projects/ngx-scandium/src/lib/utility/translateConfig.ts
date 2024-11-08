import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const path = `./assets/i18n/`;

export class CoreTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<TranslationObject> {
    return this.http.get('.' + path + lang + '.json').pipe(
      map((langFile) => langFile),
      catchError((err) => {
        console.warn(err);
        throw Error('Missing lang: ' + lang);
      })
    );
  }
}

export const createTranslateLoader =
  (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, path, '.json');

export const translateConfig = {
  loader: {
    provide: TranslateLoader,
    useClass: CoreTranslateLoader,
    deps: [HttpClient],
  },
};
