import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IWine } from '../types/wine';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  get userId(): string | undefined {
    return this.authService.userId;
  }

  getAllWines() {
    return this.http.get<{ [id: string]: IWine}>('/api/wines.json')
    .pipe(map((wines) => {
      let winesData: IWine[] = [];

      for (let id in wines) {
        winesData.push({...wines[id], id});
      }

      return winesData;
    }));
  }

  getSingleWine(wineId: string) {
    return this.http.get<IWine>(`/api/wines/${wineId}.json`)
    .pipe(map((wine) => {
      let wineData: IWine = {...wine, id: wineId}; 

      return wineData;
    }));
  }

  getByOwnerId(userId: string | undefined) {
    return this.http.get<IWine[]>(`/api/wines.json?orderBy="ownerId"&equalTo="${userId}"`)
    .pipe(map((wines) => {
      let winesData: IWine[] = [];

      for (let id in wines) {
        winesData.push({...wines[id], id});
      }

      return winesData;
    }));
  } 

  addWine(wineName: string, category: string, imageUrl: string, taste: string, wineDetails: string) {
    const ownerId = this.userId;

    return this.http.post('/api/wines.json', { wineName, category, imageUrl, taste, wineDetails, likes: [], ownerId });
  }

  editWine(wineId: string, wineName: string, category: string, imageUrl: string, taste: string, wineDetails: string) { 
    return this.http.patch<IWine>(`/api/wines/${wineId}.json`, {wineName, category, imageUrl, taste, wineDetails})
  }

  deleteWine(wineId: string) {
    return this.http.delete(`/api/wines/${wineId}.json`);
  }

  logMessage(name: string, email: string, phone: string, message: string) {
    return this.http.post('/api/logs.json', {name, email, phone, message});
  }
}
