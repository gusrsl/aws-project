import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.loading = false;
      }
    });
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          alert('Error deleting task');
        }
      });
    }
  }

  toggleTaskStatus(task: Task) {
    const updatedTask = { ...task, done: !task.done };
    this.taskService.updateTask(task.id!, updatedTask).subscribe({
      next: (response) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = response;
      },
      error: (error) => {
        console.error('Error updating task:', error);
        alert('Error updating task status');
      }
    });
  }
}