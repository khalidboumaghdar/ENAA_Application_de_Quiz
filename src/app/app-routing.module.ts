import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizeComponent } from './quize/quize.component';

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path:'quize',component:QuizeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
