import { Task } from "./item-model.rest";

export class Category {
    // Use the non-null assertion operator to indicate that this property will be initialized at runtime.
    categoryName!: string;
    tasks: Task[] = [];
  
    // Constructor with optional parameters.
    constructor(categoryName: string, tasks?: Task[]) {
      // Assign the constructor arguments to the corresponding properties.
      this.categoryName = categoryName;
      this.tasks = tasks || [];
    }
  }