import { Component, inject, Input } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task',
  // standalone: true,
  // imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  private tasksService = inject(TaskService); //alternative to constructor approach

  onCompleteTask() {
    // this.complete.emit(this.task.id);
    this.tasksService.removeTask(this.task.id);
  }
}
