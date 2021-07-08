import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskval: string;
  form: FormGroup;
  addTask: boolean = false;
  id: string;
  submitted: boolean;
  dateVal: Date

  constructor(private fb: FormBuilder, private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params.id;
  }



  ngOnInit() {
    if (this.id == undefined) {
      this.addTask = true;
    }

    this.taskval = Math.random().toString(36).substr(2, 9);


    this.form = this.fb.group({
      title: [''],
      taskval: [this.taskval],
      completed: [false],
      startDate: [''],
      endDate: [''],
    });

    if (!this.addTask) {
      this.taskService.getTask(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addTask) {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  private createTask() {
    this.taskService.createTask(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          window.alert('Task Added');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          console.log(error);
        }
      });

  }

  private updateTask() {
    this.taskService.updateTask(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          window.alert('Task Updated');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          console.log(error);
        }
      });
  }




}
