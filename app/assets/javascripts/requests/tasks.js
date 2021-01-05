// Add csrf token in all request headers
$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// indexTasks function - request for retrieving all tasks associated with an API key
var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }
  
  $.ajax(request);
};

//indexTasks();

// postTask - request for creating a new task
var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
  location.reload();
};

//postTask('Finish front end of app');

// deleteTask - deletes task using task id to select task from db
var deleteTask = function (taskId, successCB, errorCB) {
  var request = {
    type: 'DELETE',
    url: 'api/tasks/' + taskId + '?api_key=1',
    success: function (response) {
      console.log(response);
    },
    error: function (request, errorMsg) {
      console.log(request, errorMsg);
    }
  }
  $.ajax(request);
  location.reload();
};



//deleteTask(2);

// markComplete - marks a task as complete by updating completion status to true
var markComplete = function (taskId, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/' + taskId + '/mark_complete?api_key=1',
    success: function (response) {
      console.log(response);
    },
    error: function (request, errorMsg) {
      console.log(request, errorMsg);
    }
  }
  $.ajax(request);
};

//markComplete(16);

// markComplete - marks a task as complete by updating completion status to true
var markActive = function (taskId, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/' + taskId + '/mark_active?api_key=1',
    success: function (response) {
      console.log(response);
    },
    error: function (request, errorMsg) {
      console.log(request, errorMsg);
    }
  }
  $.ajax(request);
};

//markActive(16);
