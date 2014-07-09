(function(){
  var app = angular.module('TodoApp', ['ngResource', 'angularFileUpload'])

  app.factory('Tasks', ['$resource', function($resource) {
    return $resource('/api/v1/tasks/:id', { id: '@id' }, {
      'update': { method:'PUT' }
    });
  }]);

  app.controller('TodoCtrl', ['Tasks', '$upload', function(Tasks, $upload){
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

    this.onFileSelect = function($files, task) {
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        this.upload = $upload.upload({
          url: '/api/v1/tasks/' + task.id,
          method: 'PUT',
          data: {avatar: file},
        }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
          task = task.$get();
        });
      }
    };
  }]);


  app.directive('taskNote', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/task_note.html',
    }
  });

  app.directive('taskImage', function(){
    return {
      restrict: 'E',
      template: '<image ng-src="{{task.avatar}}" ng-show="task.avatar" />'
    };
  })
})();
