import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponentComponent } from './pages/pages-component/pages-component.component';
import { HomeComponentComponent } from './pages/pages-component/home-component/home-component.component';
import { StatisticComponentComponent } from './pages/pages-component/statistic-component/statistic-component.component';
import { GalleryComponentComponent } from './pages/pages-component/gallery-component/gallery-component.component';
import { AboutComponentComponent } from './pages/pages-component/about-component/about-component.component';
import { ProdDetailsComponent } from './pages/pages-component/prod-details/prod-details.component'

const routes: Routes = [
  { path: '', component: PagesComponentComponent, 
    children: [
      { path: '', component: HomeComponentComponent },
      { path: 'statictics', component: StatisticComponentComponent },
      { path: 'gallery', component: GalleryComponentComponent },
      { path: 'mushroomdetails/:id', component: ProdDetailsComponent},
      { path: 'about', component: AboutComponentComponent },
      // { path: '', redirectTo: 'home'}
    ]  
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
