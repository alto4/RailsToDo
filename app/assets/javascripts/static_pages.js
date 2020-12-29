$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {
      console.log(response);
      // Map over each task in array to build HTML output string
      var htmlString = response.tasks.map(function(task) {

        // Check for complete/active status to display accurately in the DOM
          var status;
        if (task.completed === true) {
          status = "checked";
        }

        return "\
        <div class='col-12 w-100 mb-3 p-2 border rounded task d-flex justify-content-between' data-id='" + task.id + "'>" +
          '<div>\
              <input type="checkbox" class="checkbox mr-4"' + status + ">" + task.content + 
          '</div>\
          <button class="px-3 py-0 btn btn-delete btn-danger text-right">X</i></button>' + "\
        </div>";
      });
      
      // DOM Elements to assign event listeners to upon creation
      var addButton = document.querySelector("#btn-add");
      
      // Event Handler for Add Button - add new item to list if input field is populated
      addButton.addEventListener("click", function (e) {
        var taskInput = document.querySelector(".task-input").value;
        e.preventDefault();
        postTask(taskInput);
        indexTasks();
        // Clear input value once new item has been added to the list
        document.querySelector(".task-input").value = "";
      });

      $("#tasks").html(htmlString);    

      var completeButtons = Array.from(document.querySelectorAll("input.checkbox"));
      
      completeButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          console.log(e.target.checked);
          var taskId = e.target.parentElement.parentElement.getAttribute("data-id");
          console.log("Task id for processing: " + taskId);
          
          //markComplete(taskId);
          markActive(taskId);
          
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
    });
  }
});
