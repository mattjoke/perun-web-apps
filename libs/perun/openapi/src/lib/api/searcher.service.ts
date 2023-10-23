/**
 * Perun RPC API
 * Perun Remote Procedure Calls Application Programming Interface
 *
 * The version of the OpenAPI document: 0.0.0
 * Contact: perun@cesnet.cz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
  HttpContext,
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

// @ts-ignore
import { Facility } from '../model/facility';
// @ts-ignore
import { InputGetFacilities } from '../model/inputGetFacilities';
// @ts-ignore
import { InputGetMatchResources } from '../model/inputGetMatchResources';
// @ts-ignore
import { InputGetMembersByUserAttributes } from '../model/inputGetMembersByUserAttributes';
// @ts-ignore
import { InputGetResources } from '../model/inputGetResources';
// @ts-ignore
import { InputGetUsers } from '../model/inputGetUsers';
// @ts-ignore
import { Member } from '../model/member';
// @ts-ignore
import { PerunException } from '../model/perunException';
// @ts-ignore
import { Resource } from '../model/resource';
// @ts-ignore
import { User } from '../model/user';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class SearcherService {
  protected basePath = 'https://api-dev.perun-aai.org/ba/rpc';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration,
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        (value as any[]).forEach(
          (elem) => (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key)),
        );
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k,
            )),
        );
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }

  /**
   * Get list of resources that have attributes with partially matched values if allowPartialMatchForString is set to true, else with exactly matched values.
   * @param InputGetMatchResources
   * @param useNon if set to true sends the request to the backend server as 'non' instead of the usual (oauth, krb...).
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAttributesMatchResources(
    InputGetMatchResources: InputGetMatchResources,
    useNon?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<Array<Resource>>;
  public getAttributesMatchResources(
    InputGetMatchResources: InputGetMatchResources,
    useNon?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpResponse<Array<Resource>>>;
  public getAttributesMatchResources(
    InputGetMatchResources: InputGetMatchResources,
    useNon?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpEvent<Array<Resource>>>;
  public getAttributesMatchResources(
    InputGetMatchResources: InputGetMatchResources,
    useNon: boolean = false,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<any> {
    if (InputGetMatchResources === null || InputGetMatchResources === undefined) {
      throw new Error(
        'Required parameter InputGetMatchResources was null or undefined when calling getAttributesMatchResources.',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarCredential: string | undefined;
    // authentication (BasicAuth) required
    localVarCredential = this.configuration.lookupCredential('BasicAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Basic ' + localVarCredential);
    }

    // authentication (BearerAuth) required
    localVarCredential = this.configuration.lookupCredential('BearerAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
    }

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let requestUrl = `${this.configuration.basePath}/json/searcher/getResources/attributes-match`;
    if (useNon) {
      // replace the authentication part of url with 'non' authentication
      let helperUrl = new URL(requestUrl);
      let path = helperUrl.pathname.split('/');
      path[1] = 'non';
      helperUrl.pathname = path.join('/');
      requestUrl = helperUrl.toString();
    }
    return this.httpClient.post<Array<Resource>>(requestUrl, InputGetMatchResources, {
      context: localVarHttpContext,
      responseType: <any>responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get list of resources who have attributes with specific values.
   * @param InputGetResources
   * @param useNon if set to true sends the request to the backend server as 'non' instead of the usual (oauth, krb...).
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAttributesResources(
    InputGetResources: InputGetResources,
    useNon?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<Array<Resource>>;
  public getAttributesResources(
    InputGetResources: InputGetResources,
    useNon?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpResponse<Array<Resource>>>;
  public getAttributesResources(
    InputGetResources: InputGetResources,
    useNon?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpEvent<Array<Resource>>>;
  public getAttributesResources(
    InputGetResources: InputGetResources,
    useNon: boolean = false,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<any> {
    if (InputGetResources === null || InputGetResources === undefined) {
      throw new Error(
        'Required parameter InputGetResources was null or undefined when calling getAttributesResources.',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarCredential: string | undefined;
    // authentication (BasicAuth) required
    localVarCredential = this.configuration.lookupCredential('BasicAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Basic ' + localVarCredential);
    }

    // authentication (BearerAuth) required
    localVarCredential = this.configuration.lookupCredential('BearerAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
    }

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let requestUrl = `${this.configuration.basePath}/json/searcher/getResources/attributes`;
    if (useNon) {
      // replace the authentication part of url with 'non' authentication
      let helperUrl = new URL(requestUrl);
      let path = helperUrl.pathname.split('/');
      path[1] = 'non';
      helperUrl.pathname = path.join('/');
      requestUrl = helperUrl.toString();
    }
    return this.httpClient.post<Array<Resource>>(requestUrl, InputGetResources, {
      context: localVarHttpContext,
      responseType: <any>responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get list of facilities who have attributes with specific values.
   * @param InputGetFacilities
   * @param useNon if set to true sends the request to the backend server as 'non' instead of the usual (oauth, krb...).
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getFacilities(
    InputGetFacilities: InputGetFacilities,
    useNon?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<Array<Facility>>;
  public getFacilities(
    InputGetFacilities: InputGetFacilities,
    useNon?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpResponse<Array<Facility>>>;
  public getFacilities(
    InputGetFacilities: InputGetFacilities,
    useNon?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpEvent<Array<Facility>>>;
  public getFacilities(
    InputGetFacilities: InputGetFacilities,
    useNon: boolean = false,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<any> {
    if (InputGetFacilities === null || InputGetFacilities === undefined) {
      throw new Error(
        'Required parameter InputGetFacilities was null or undefined when calling getFacilities.',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarCredential: string | undefined;
    // authentication (BasicAuth) required
    localVarCredential = this.configuration.lookupCredential('BasicAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Basic ' + localVarCredential);
    }

    // authentication (BearerAuth) required
    localVarCredential = this.configuration.lookupCredential('BearerAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
    }

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let requestUrl = `${this.configuration.basePath}/json/searcher/getFacilities`;
    if (useNon) {
      // replace the authentication part of url with 'non' authentication
      let helperUrl = new URL(requestUrl);
      let path = helperUrl.pathname.split('/');
      path[1] = 'non';
      helperUrl.pathname = path.join('/');
      requestUrl = helperUrl.toString();
    }
    return this.httpClient.post<Array<Facility>>(requestUrl, InputGetFacilities, {
      context: localVarHttpContext,
      responseType: <any>responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get list of members who have attributes with specific values.
   * @param InputGetMembersByUserAttributes
   * @param useNon if set to true sends the request to the backend server as 'non' instead of the usual (oauth, krb...).
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMembersByUserAttributes(
    InputGetMembersByUserAttributes: InputGetMembersByUserAttributes,
    useNon?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<Array<Member>>;
  public getMembersByUserAttributes(
    InputGetMembersByUserAttributes: InputGetMembersByUserAttributes,
    useNon?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpResponse<Array<Member>>>;
  public getMembersByUserAttributes(
    InputGetMembersByUserAttributes: InputGetMembersByUserAttributes,
    useNon?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpEvent<Array<Member>>>;
  public getMembersByUserAttributes(
    InputGetMembersByUserAttributes: InputGetMembersByUserAttributes,
    useNon: boolean = false,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<any> {
    if (InputGetMembersByUserAttributes === null || InputGetMembersByUserAttributes === undefined) {
      throw new Error(
        'Required parameter InputGetMembersByUserAttributes was null or undefined when calling getMembersByUserAttributes.',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarCredential: string | undefined;
    // authentication (BasicAuth) required
    localVarCredential = this.configuration.lookupCredential('BasicAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Basic ' + localVarCredential);
    }

    // authentication (BearerAuth) required
    localVarCredential = this.configuration.lookupCredential('BearerAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
    }

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let requestUrl = `${this.configuration.basePath}/json/searcher/getMembersByUserAttributes`;
    if (useNon) {
      // replace the authentication part of url with 'non' authentication
      let helperUrl = new URL(requestUrl);
      let path = helperUrl.pathname.split('/');
      path[1] = 'non';
      helperUrl.pathname = path.join('/');
      requestUrl = helperUrl.toString();
    }
    return this.httpClient.post<Array<Member>>(requestUrl, InputGetMembersByUserAttributes, {
      context: localVarHttpContext,
      responseType: <any>responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * Get list of users who have attributes with specific values.
   * @param InputGetUsers
   * @param useNon if set to true sends the request to the backend server as 'non' instead of the usual (oauth, krb...).
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUsersSearcher(
    InputGetUsers: InputGetUsers,
    useNon?: boolean,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<Array<User>>;
  public getUsersSearcher(
    InputGetUsers: InputGetUsers,
    useNon?: boolean,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpResponse<Array<User>>>;
  public getUsersSearcher(
    InputGetUsers: InputGetUsers,
    useNon?: boolean,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<HttpEvent<Array<User>>>;
  public getUsersSearcher(
    InputGetUsers: InputGetUsers,
    useNon: boolean = false,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'application/json'; context?: HttpContext },
  ): Observable<any> {
    if (InputGetUsers === null || InputGetUsers === undefined) {
      throw new Error(
        'Required parameter InputGetUsers was null or undefined when calling getUsersSearcher.',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarCredential: string | undefined;
    // authentication (BasicAuth) required
    localVarCredential = this.configuration.lookupCredential('BasicAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Basic ' + localVarCredential);
    }

    // authentication (BearerAuth) required
    localVarCredential = this.configuration.lookupCredential('BearerAuth');
    if (localVarCredential) {
      localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
    }

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let requestUrl = `${this.configuration.basePath}/json/searcher/getUsers`;
    if (useNon) {
      // replace the authentication part of url with 'non' authentication
      let helperUrl = new URL(requestUrl);
      let path = helperUrl.pathname.split('/');
      path[1] = 'non';
      helperUrl.pathname = path.join('/');
      requestUrl = helperUrl.toString();
    }
    return this.httpClient.post<Array<User>>(requestUrl, InputGetUsers, {
      context: localVarHttpContext,
      responseType: <any>responseType_,
      withCredentials: this.configuration.withCredentials,
      headers: localVarHeaders,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
