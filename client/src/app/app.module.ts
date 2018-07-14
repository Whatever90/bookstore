import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Utilized for Angular forms
import { HttpModule } from '@angular/http'; // Utilized for Angular HTTP requests to any API.
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskService } from './task.service';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';
// import { LocalStorageService } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [TaskService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
