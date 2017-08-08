class TodoAppController {
  constructor($scope) {
      "ngInject";
    this.name = 'todoApp';

      this.$onInit=()=>{
          console.log(this.todoList);
      };

      $scope.pickItem=(item)=>{
            console.log(item);
      }

  }

    // pickItem(item){
    //     console.log(item);
    // }
}
export default TodoAppController;
