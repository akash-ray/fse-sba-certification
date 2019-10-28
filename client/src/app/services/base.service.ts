import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ServiceError } from '../models/serviceerror';
import { environment } from '../../environments/environment';


export class BaseService {
    constructor() { }
    protected extractData(res: Response) {
        const body = res.json();
        if (body.status === 'success') {
            return body.data;
        } else if (body.status === 'fail') {
            throw new ServiceError(body.message, body.data, 'fail');
        } else if (body.status === 'error') {
            throw new ServiceError(body.message, body.data);
        } else {
            throw new ServiceError('Invalid JSend Response Status [' + body.status + ']');
        }
    }
    public baseurl(): string {
        return environment.baseApiUrl;
    }

    protected handleError(error: any) {
        if (error instanceof ServiceError) {
            return Observable.throw(error);
        } else {
            const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            return Observable.throw(new ServiceError(errMsg));
        }
    }
}