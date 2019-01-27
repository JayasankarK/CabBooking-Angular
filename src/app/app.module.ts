import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CabserviceService } from './cabservice.service';
import { HttpModule } from '@angular/http';
import { BookinghomeComponent } from './bookinghome/bookinghome.component';
import { BookcabpageComponent } from './bookcabpage/bookcabpage.component';
import { HistorypageComponent } from './historypage/historypage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import{BsDatepickerModule} from 'ngx-bootstrap/datepicker';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'bookhome', component: BookinghomeComponent, children: [
      { path: 'bookcab', component: BookcabpageComponent, outlet: "navbar" },
      { path: 'bookhistory', component: HistorypageComponent, outlet: "navbar" }
    ]
  }
  // {path:'bookcab',component:BookcabpageComponent,outlet:"navbar"},
  // {path:'bookhistory',component:HistorypageComponent,outlet:"navbar"}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookinghomeComponent,
    BookcabpageComponent,
    HistorypageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [CabserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
