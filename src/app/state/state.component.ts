import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../models/item-model.rest'; // import the necessary models
import { Category } from '../models/category-model.rest';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {

  // create an initial category with a single example task
  initialCategory: Category = new Category('To Do', [new Task('Example Task', new Date(), 'This is an example Task')]);

  // create a dictionary of categories, with the initial category as the only entry
  categories: Category[] = [this.initialCategory];

  errorMessage: string = ''; // initialize an error message string
  @ViewChild('errorMessageElement') errorMessageElement: ElementRef; // get a reference to the error message element
  constructor(private elementRef: ElementRef) {
    this.errorMessageElement = this.elementRef.nativeElement.querySelector('#error-message'); // assign the error message element to errorMessageElement
  }

  // handle a drag-and-drop event
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); // move the item within the same container
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      ); // transfer the item from the previous container to the new container
    }
  }

  // handle the click event of the "Add" button
  onAddButton(addCategory: string) {
    if (Object.keys(this.categories).length < 3 && addCategory !== '') { // check that the maximum number of categories hasn't been reached and that the category name is not empty
      const newCategory = new Category(addCategory, []); // create a new category with an empty task array
      this.categories.push(newCategory); // add the new category to the dictionary of categories
      this.errorMessage = ''; // reset the error message
    } else if (addCategory === '') { // if the category name is empty, show an error message
      this.errorMessage = 'A category cannot be empty';
      this.errorMessageElement.nativeElement.scrollIntoView({ behavior: 'smooth' }); // scroll to the error message element
    } else { // if the maximum number of categories has been reached, show an error message
      this.errorMessage = 'You can only add up to 3 categories.';
      this.errorMessageElement.nativeElement.scrollIntoView({ behavior: 'smooth' }); // scroll to the error message element
    }
  }

  // handle the click event of the "Add Task" button
  onAddItem(addItemTitle: string, addItemDescription: string, addItemAssignee: string, addItemReporter: string, category: number) {
    const date = new Date(); // create a new Date object
    const task = new Task(addItemTitle, date, addItemDescription, addItemAssignee, addItemReporter); // create a new task object with the given properties and the current date
    this.categories[category].tasks.push(task); // add the new task to the tasks array of the specified category
  }

  // handle the click event of the "Delete Category" button
  onDeleteCategory(categoryName: number) {
    if (Object.keys(this.categories).length > 1) { // check if there are more than one categories
      this.categories.splice(categoryName,1); // delete the specified category
    } else {
      this.errorMessage = 'You must have atleast one category'; // display an error message if there is only one category left
      this.errorMessageElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onDeleteTask(categoryKey: number, task: Task) {
    const category = this.categories[categoryKey]; // get the category object from the categories object
    const index = category.tasks.indexOf(task); // get the index of the task in the tasks array of the category
    if (index >= 0) { // check if the task exists in the tasks array of the category
      category.tasks.splice(index, 1); // remove the task from the tasks array of the category
    }
  }

}
