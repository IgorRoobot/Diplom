//core settings
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from "@angular/forms";
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from './../environments/environment';

//components and services
import { AppComponent } from './app.component';
import { PagesComponentComponent } from './pages/pages-component/pages-component.component';
import { HomeComponentComponent } from './pages/pages-component/home-component/home-component.component';
import { StatisticComponentComponent } from './pages/pages-component/statistic-component/statistic-component.component';
import { GalleryComponentComponent } from './pages/pages-component/gallery-component/gallery-component.component';
import { AboutComponentComponent } from './pages/pages-component/about-component/about-component.component';
import { HeaderComponentComponent } from './pages/pages-component/core/header-component/header-component.component';
import { FooterComponentComponent } from './pages/pages-component/core/footer-component/footer-component.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DbListService } from './pages/pages-component/core/db-list.service';
import { StatisticService } from './pages/pages-component/statistic-component/statistic.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProdDetailsComponent } from './pages/pages-component/prod-details/prod-details.component';
import { SpinerComponent } from './pages/pages-component/core/spiner/spiner.component';
import { httpService } from './pages/pages-component/core/http.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponentComponent,
    HomeComponentComponent,
    StatisticComponentComponent,
    GalleryComponentComponent,
    AboutComponentComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    ProdDetailsComponent,
    SpinerComponent,
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpModule,
  ],
  providers: [DbListService, StatisticService, httpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
