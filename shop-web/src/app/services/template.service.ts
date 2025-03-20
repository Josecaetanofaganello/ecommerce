import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private scheduleTemplate$: Observable<string>;

  constructor(private http: HttpClient) {
    // Cache the template
    this.scheduleTemplate$ = this.http.get(
      'assets/templates/schedule.template.html',
      { responseType: 'text' }
    ).pipe(
      shareReplay(1)
    );
  }

  getScheduleTemplate(): Observable<string> {
    return this.scheduleTemplate$;
  }
} 