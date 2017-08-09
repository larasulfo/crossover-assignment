class TodoAppController {
    constructor($scope, todoService,localStorageService) {
        "ngInject";
        this.todoService = todoService;
        this._localStorageService = localStorageService;


        this.$onInit = () => {
            //initialising app
            this.loadingRequest = {};
            this.userName = this._localStorageService.get('username');
        };

        //defining false drag status
        this.resetTasks();

        /**
         * keeps selected index and base bucket
         * @param index
         * @param from
         */
        $scope.pickItem = (index, from) => {

            this.selectedIndex = index;
            this.fromBucket = from;

        };

        /**
         * allows drop task
         * @param event
         */
        $scope.allowDrop = (event) => {
            event.preventDefault();
        };

        /**
         * changing task status, sending edit function
         * @param target
         */
        $scope.dropItem = (target) => {

            if (target !== this.fromBucket) {

                this.todoList[this.selectedIndex].status = target;
                $scope.$apply();
                this.editTodo(this.todoList[this.selectedIndex], this.selectedIndex);

            } else {
                this.resetTasks();
            }
        }

    }

    /**
     * refreshing
     */
    resetTasks() {
        this.selectedIndex = false;
        this.fromBucket = false;

    }

    /**
     * sending updated task to api
     * while updating doesn't allow to drag by loadingRequest
     * @param task
     * @param index
     */
    editTodo(task, index) {
        this.loadingRequest[index] = true;
        this.resetTasks();
        this.todoService.editTodo(task).then((response) => {
            //checking it is new or updated task.If it is new,adding _id
            if (!this.todoList[index]._id) {
                this.todoList[index]._id = response.plain()._id;
            }
            this.loadingRequest[index] = false;
        });
    }

    /**
     * adds new task with default data
     */
    addTodo() {

        this.todoList.push({
                title: 'Title',
                description: 'description',
                status: 'notCompleted',
                createMode: true
            }
        );
    }

    /**
     * it takes task component callback, porting edit function
     * @param item
     * @param index
     */
    updateTask(item, index) {

        this.editTodo(item, index);
    }

    /**
     * deleting task by finding its index
     * @param item
     */

    deleteTask(item) {
        let index = this.todoList.findIndex((task) => {
            return item._id == task._id;

        });


        this.todoService.apiDeleteTask(item).then((response) => {

        });

        this.todoList.splice(index, 1);
    }


}
export default TodoAppController;
