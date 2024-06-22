import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,} from '@angular/forms';

@Component({
  selector: 'app-class',
  standalone: true,
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
  imports: [CommonModule,ReactiveFormsModule],
})
export class ClassComponent implements OnInit {
  ClassList: Class[] = [];
  isAddClassModalOpen = false;
  selectedClassesForDeletion: Class[] = [];

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses() {
    this.classService.getClass().subscribe(
      (data) => {
        this.ClassList = data;
        console.log(this.ClassList);
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  deleteClasses(): void {
    if (this.selectedClassesForDeletion.length === 0) {
      alert('Please select classes to delete.');
      return;
    }

    const confirmation = confirm('Are you sure you want to delete the selected classes?');
    if (!confirmation) {
      return; // User canceled deletion
    }

    this.selectedClassesForDeletion.forEach((classItem) => {
      this.classService.deleteClass(classItem.id).subscribe({
        next: (response) => {
          console.log('Class deleted successfully:', response);
          this.ClassList = this.ClassList.filter((c) => c.id !== classItem.id); // Update local list
        },
        error: (error) => {
          console.error('Error deleting class:', error);
          alert('An error occurred while deleting classes. Please try again.');
        },
      });
    });

    this.selectedClassesForDeletion = []; // Clear selected classes after deletion
  }

  isSelected(classItem: Class): boolean {
    return this.selectedClassesForDeletion.some((selectedClass) => selectedClass.id === classItem.id);
  }

  toggleSelection(classItem: Class): void {
    const classIndex = this.selectedClassesForDeletion.findIndex((selectedClass) => selectedClass.id === classItem.id);
    if (classIndex > -1) {
      this.selectedClassesForDeletion.splice(classIndex, 1);
    } else {
      this.selectedClassesForDeletion.push(classItem);
    }
  }

  openAddClassModal(): void {
    this.isAddClassModalOpen = true;
  }

  closeAddClassModal(): void {
    this.isAddClassModalOpen = false;
  }
}
