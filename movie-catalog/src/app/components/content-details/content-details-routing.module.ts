import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentDetailsComponent } from './content-details.component';


const routes: Routes = [
  { path: '', component: ContentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentDetailsRoutingModule { }