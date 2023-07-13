import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements AfterViewInit {

  countryData: any = {};

  constructor(private http: HttpClient, private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const paths = this.elRef.nativeElement.querySelectorAll('path');
    paths.forEach((path: Element) => {
      path.addEventListener('mouseenter', () => this.fetchCountryData(path.id));
      path.addEventListener('mouseleave', this.resetCountryData);
    });
  }

  fetchCountryData(countryId: string): void {
    this.http.get(`https://api.worldbank.org/V2/country/${countryId}?format=json`).subscribe(
      data => {
        const dataPath = (data as any[])[1][0];
        this.countryData = {
          name: dataPath.name,
          capital: dataPath.capitalCity,
          region: dataPath.region.value,
          income: dataPath.incomeLevel.value,
          longitude: dataPath.longitude,
          latitude: dataPath.latitude
        };
      },
      error => {
        console.error('Error fetching data: ', error);
        this.resetCountryData();
      }
    );
  }

  resetCountryData(): void {
    this.countryData = {};
  }
}