$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {
      //console.log(response);
      // Map over each task in array to build HTML output string
      var htmlString = response.tasks.map(function(task) {
        return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
          " + task.content + "\
          </div>";
      })
    
    $("#tasks").html(htmlString);
    });
  }
});