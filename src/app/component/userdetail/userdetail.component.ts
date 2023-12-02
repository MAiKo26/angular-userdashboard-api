import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Response } from '../../interface/response.interface';
import { User } from '../../interface/user.interface';
import { Coordinate } from '../../interface/coordinate.interface';
import * as Leaftlet from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss',
})
export class UserdetailComponent implements OnInit {
  response: Response;
  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: string = 'Edit';
  marker = new Leaftlet.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = <User>(
      this.activatedRoute.snapshot.data['resolvedResponse'].results[0]
    );
    console.log(this.user);
    this.loadMap(this.user.coordinate);
    // this.activatedRoute.params.subscribe((params) => {
    //   this.userService.getUser(params['uuid']).subscribe((response: any) => {
    //     console.log(response);
    //     this.response = response;
    //   });
    //   this.user = this.response.results[0];
    // });
  }

  switchMode(mode?: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
    if (mode === 'edit') {
      console.log('updating user in backend');
    }
  }

  private loadMap(coordinate: Coordinate): void {
    const map = Leaftlet.map('map', {
      center: [coordinate.lattitude, coordinate.longitude],
      zoom: 8,
    });
    const mainLayer = Leaftlet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 30,
        crossOrigin: true,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(map);
    const marker = Leaftlet.marker(
      [coordinate.lattitude, coordinate.longitude],
      { icon: this.marker }
    );
    marker
      .addTo(map)
      .bindPopup(`${this.user.firstName}'s Location`)
      .openPopup();
  }
}
