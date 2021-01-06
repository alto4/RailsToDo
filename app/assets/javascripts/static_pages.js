$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {

    // Map over each task in array to build HTML output string
    htmlString = response.tasks.map(function(task) {

      // Check for complete/active status to display accurately in the DOM
      var status;

      if (task.completed === true) {
        status = "checked";
      }

      // Render individual task item
      return "\
        <div class='col-12 w-100 mb-3 p-3 border rounded align-items-center task d-flex justify-content-between' data-id='" + task.id + "'>" +
          '<div>' + 
            '<input type="checkbox" class="checkbox mr-4"' + status + ">" + '<span class="description h6">' + task.content + "</span>" + 
          '</div>' +
          '<button class="px-2 py-1 btn btn-delete btn-danger text-right"><i class="fa fa-trash"></i></button>' + "\
        </div>";
    });
      
    // Event Handler for add buttons - add new item to list if input field is populated
    var addButton = document.querySelector("#btn-add");
    addButton.addEventListener("click", function (e) {
      var taskInput = document.querySelector(".task-input").value;
      e.preventDefault();
      postTask(taskInput);

      // Clear input value once new item has been added to the list
      document.querySelector(".task-input").value = "";
    });

    $("#tasks").html(htmlString);    

    // Event Handler for complete buttons - toggles tasks as complete/incomplete
    var completeButtons = Array.from(document.querySelectorAll("input.checkbox"));
 
    completeButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        var taskId = e.target.parentElement.parentElement.getAttribute("data-id");
        
        if (!e.target.checked) {
          markActive(taskId);
        } else {
          markComplete(taskId);
        }
      });
    });

    // Event listener for delete buttons
    var deleteButtons = Array.from(document.querySelectorAll(".btn-danger"));
            
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        var taskId = e.target.parentElement.getAttribute("data-id");
        deleteTask(taskId);
      });
    });
  })}
});
