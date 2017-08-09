class TaskController {
  constructor() {
    this.name = 'task';
  }

  deleteTask(){
     this.onDelete({item:this.obj});


  }
}

export default TaskController;
