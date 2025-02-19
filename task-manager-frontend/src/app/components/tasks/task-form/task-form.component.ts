import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Removido RouterLink ya que no se usa
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    done: false,
    userId: ''
  };
  isEditing = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditing = true;
      this.taskService.getTask(taskId).subscribe({
        next: (task) => this.task = task,
        error: (error) => {
          console.error('Error loading task:', error);
          this.router.navigate(['/tasks']);
        }
      });
    }
  }

  onSubmit() {
    if (this.isEditing) {
      this.taskService.updateTask(this.task.id!, this.task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Error updating task:', error)
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Error creating task:', error)
      });
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}