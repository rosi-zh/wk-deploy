import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { environment } from "src/environments/environment";

const { apiUrl, authUrl } = environment;


@Injectable()

export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/api')) {
            req = req.clone({
                url: req.url.replace('/api', apiUrl),
            });
        } else if (req.url.startsWith('/auth')) {
            req = req.clone({
                url: req.url.replace('/auth', authUrl),
            });
        }

        // return next.handle(req).pipe(
        //     catchError((error) => {
        //         console.log(error.error.error.message);

        //         return [error];
        //     })
        // );

        return next.handle(req);
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}