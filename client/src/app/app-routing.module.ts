import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserComponent, pathMatch: 'full'  },
  { path: 'book/:id', component: BookComponent, pathMatch: 'full'  },
  // { path: 'ratings', component: PostsComponent },
  // { path: 'players/addplayer', component: HomeNewComponent },
  // { path: 'players/delete/:id', component: HomeNewComponent },

  // { path: 'status/game/2', component: ProductsComponent },
  // { path: 'status/game/3', component: DeleteComponent },
  // { path: 'products/edit/:id', component: EditComponent },
  // { path: 'products/new', component: NewComponent },
  // { path: 'products/delete/:id', component: DeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
