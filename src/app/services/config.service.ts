import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//
// This service/class provides a centralized place to persist config values
// (eg, to share values between multiple components).
//

@Injectable()
export class ConfigService {
  private configuration = {};
  // defaults
  private _isApplistListVisible = false;
  private _isApplistFiltersVisible = false;
  private _listPageSize = 10;
  // private _lists = [];

  // TODO: store these in URL instead
  private _baseLayerName = 'World Topographic'; // NB: must match a valid base layer name
  private _mapBounds: L.LatLngBounds = null;

  constructor(
    private httpClient: HttpClient
  ) { }
  /**
   * Initialize the Config Service.  Get configuration data from front-end build, or back-end if nginx
   * is configured to pass the /config endpoint to a dynamic service that returns JSON.
   */
  async init() {
    try {
      // Attempt to get application via this.httpClient. This uses the url of the application that you are running it from
      // This will not work for local because it will try and get localhost:4200/api instead of 3000/api...
      this.configuration = await this.httpClient.get(`api/config`).toPromise();

      console.log('Configuration:', this.configuration);
      if (this.configuration['debugMode']) {
        console.log('Configuration:', this.configuration);
      }
    } catch (e) {
      // If all else fails, use variables found in env.js of the application calling config service.
      this.configuration = window['__env'];
      console.log('Error getting local configuration:', e);
      if (this.configuration['debugMode']) {
        console.log('Configuration:', this.configuration);
      }
    }
    return Promise.resolve();
  }

  get config(): any {
    return this.configuration;
  }

  public createConfigData(configData, application, pathAPI: string) {
    return this.httpClient.post(`${pathAPI}/config/${application}`, configData, {});
  }

  public editConfigData(configData, configId, application, pathAPI: string) {
    return this.httpClient.put(`${pathAPI}/config/${application}/${configId}`, configData, {});
  }

  // TODO: Get this when we init config.
  get lists(): Observable<any> {
    return of([]);
    // if (this._lists.length === 0) {
    //   return this.api.getFullDataSet('List')
    //     .map(res => {
    //       if (res) {
    //         this._lists = res[0].searchResults;
    //         return this._lists;
    //       }
    //       return null;
    //     })
    //     .catch(error => this.api.handleError(error));
    // } else {
    //   return of(this._lists);
    // }
  }

  get isApplistListVisible(): boolean { return this._isApplistListVisible; }
  set isApplistListVisible(val: boolean) { this._isApplistListVisible = val; }

  get isApplistFiltersVisible(): boolean { return this._isApplistFiltersVisible; }
  set isApplistFiltersVisible(val: boolean) { this._isApplistFiltersVisible = val; }

  get listPageSize(): number { return this._listPageSize; }
  set listPageSize(val: number) { this._listPageSize = val; }

  get baseLayerName(): string { return this._baseLayerName; }
  set baseLayerName(val: string) { this._baseLayerName = val; }

  get mapBounds(): L.LatLngBounds { return this._mapBounds; }
  set mapBounds(val: L.LatLngBounds) { this._mapBounds = val; }

}
