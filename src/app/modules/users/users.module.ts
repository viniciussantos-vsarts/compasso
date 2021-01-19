import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserSearchComponent } from './pages/user-search/user-search.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [UsersComponent, UserSearchComponent, UserDetailsComponent],
  imports: [CommonModule,FormsModule,
    ReactiveFormsModule, UsersRoutingModule, SharedModule],
  providers: [UsersService],
})
export class UsersModule {}
