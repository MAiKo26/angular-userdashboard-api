import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './component/users/users.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserdetailComponent,
    NotfoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
