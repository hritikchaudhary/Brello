export class Task {
    // Use the non-null assertion operator to indicate that this property will be initialized at runtime.
    title!: string;
    // Initialize the property with an empty string by default.
    description: string = '';
    assignee: string = '';
    reporter: string = '';
    // Use the non-null assertion operator to indicate that this property will be initialized at runtime.
    date!: Date;
  
    // Constructor with optional parameters.
    constructor(
      title: string,
      date: Date,
      description?: string,
      assignee?: string,
      reporter?: string
    ) {
      // Assign the constructor arguments to the corresponding properties.
      this.title = title;
      this.assignee = assignee || '';
      this.reporter = reporter || '';
      this.description = description || '';
      this.date = date;
    }
  }
  