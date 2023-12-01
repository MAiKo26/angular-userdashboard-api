import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="container mt-4 mb-4">
    <div class="row">
      <div class="col-xs-12">
        <h2>{{ title }}</h2>
        <hr />
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular User Dashboard API';
}
