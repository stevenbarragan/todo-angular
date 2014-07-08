(function(){
  var app = angular.module('TodoApp', ['ngResource'])

  app.factory('Tasks', ['$resource', function($resource) {
    return $resource('/api/v1/tasks/:id', { id: '@id' }, {
      'update': { method:'PUT' }
    });
  }]);

  app.controller('TodoCtrl', ['Tasks', function(Tasks){
    this.tasks = Tasks.query();
    this.newTask = new Tasks

    this.update = function(task){
      task.$update();
    };

    this.delete = function(task){
      this.tasks.splice(this.tasks.indexOf(task), 1)
      task.$remove();
    }

    this.saveNew = function(){
      this.newTask.$save();
      this.tasks.push(this.newTask);
      this.newTask = new Tasks
    };

    this.inputKeyPress = function(ev){
      if(ev.which == 13){
        this.saveNew();
      }
    };

    this.update_note = function(task){
      this.update(task);
      task.editing = false;
    }

    this.updateKeyPress = function(ev, task){
      if(ev.which == 13){
        this.update_note(task);
      }
    };
  }]);

  app.directive('taskNote', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/task_note.html',
      link: function(scope, elem, attrs){
        $(elem).find('div').bind('dblclick', function(env){
          $scope.task.editing = true
          // console.log(scope.task.editing);
        })
      }
    }
  });
})();
