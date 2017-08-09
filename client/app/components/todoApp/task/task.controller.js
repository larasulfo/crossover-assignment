class TaskController {
    constructor() {

        //initialising
        this.$onInit = () => {
            if (this.obj.createMode) {
                //checking if it i a new task
                this.createMode = true;
                this.updateMode = true;
            } else {
                this.updateMode = false;
                this.createMode = false;
            }
        };
    }

    /**
     * callback parent component, sending delete action
     */
    deleteTask() {
        this.onDelete({item: this.obj});


    }
    /**
     * when double click, making content editable/not editable
     * while adding new task it doesn't allow change updateMode
     */
    changeMode() {
        if (!this.createMode) {
            this.updateMode = !this.updateMode;
        }
    }

    /**
     * sending update action with updated object to parent component
     * if it is a new task removing create mode attribute
     * stopping create/update mode
     */
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
