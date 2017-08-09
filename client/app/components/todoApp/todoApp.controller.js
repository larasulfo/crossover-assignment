class TodoAppController {
    constructor($scope,todoService) {
        "ngInject";
        this.name = 'todoApp';
        this.todoService = todoService;


        this.$onInit = () => {
            console.log(this.todoList);
        };

        this.resetTasks();

        $scope.pickItem = (index, from) => {

            this.selectedIndex = index;
            this.fromBucket = from;

        };

        $scope.allowDrop = (event) => {
            event.preventDefault();
        };

        $scope.dropItem = (target) => {

            if (target !== this.fromBucket) {

                this.todoList[this.selectedIndex].status=target;
                $scope.$apply();
                this.editTodo(this.selectedIndex);

            } else {
                this.resetTasks();
            }
        }

    }


    resetTasks() {
        this.selectedIndex = false;
        this.fromBucket = false;

    }

    editTodo(index){

        let task=this.todoList[index];
        this.todoService.editTodo(task).then((response)=>{
            console.log(response);
        });
    }


}
export default TodoAppController;
