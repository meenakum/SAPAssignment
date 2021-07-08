import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../models/task';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  tasks: Task[];
  public selectedtaskval: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //get all tasks
    this.taskService.getAll()
      .pipe(first())
      .subscribe((data: Task[]) => {
        console.log(data);
        this.tasks = data;
      })

  }

  onTaskClick(task: Task) {
    this.taskService.getTask(task.taskval)
      .pipe(first())
      .subscribe(val => {
        let currentDate = new Date().toJSON().split("T")[0];
        let lastDate = new Date(val.endDate).toJSON().split("T")[0];
        console.log("val>>", lastDate, currentDate);
        if (lastDate >= currentDate) {
          this.taskService.patchTask(task.taskval, task).subscribe(() => {
            // the task has been set to completed successfully
            window.alert("Task marked as Done");
            location.reload();
          })
        }
        else {
          window.alert("Cannot Mark it done after date is crossed");
        }
      });

  }


  onDeleteTaskClick(id: string) {
    let confirmation = window.confirm("Confirm to delete?");
    if (confirmation) {
      this.taskService.deleteTask(id).subscribe((res: any) => {
        this.tasks = this.tasks.filter(val => val.taskval !== id);
      })
    }
    else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }

  }

}
