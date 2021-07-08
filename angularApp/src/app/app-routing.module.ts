import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './task/task-view/task-view.component';
import { NewTaskComponent } from './task/new-task/new-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: TaskViewComponent },
  { path: 'task/addTask', component: NewTaskComponent },
  { path: 'task/editTask/:id', component: NewTaskComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
