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

    this.editTask = function(task){
      console.log('editing')
      task.editing = true
    }

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
})();
