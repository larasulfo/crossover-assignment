class TaskController {
    constructor() {
        this.name = 'task';

        this.$onInit = () => {
            if (this.obj.createMode) {
                this.createMode = true;
                this.updateMode = true;
            } else {
                this.updateMode = false;
                this.createMode = false;
            }
        };
    }

    deleteTask() {
        this.onDelete({item: this.obj});


    }

    changeMode() {
        if (!this.createMode) {
            this.updateMode = !this.updateMode;
        }
    }

    updateTask() {
        if (this.createMode) {
            delete this.obj.createMode;
        }
        this.onUpdate({item: this.obj});
        this.updateMode = false;
        this.createMode = false;
    }
}

export default TaskController;
