var input_task = document.querySelector("#input-task");
var priority = document.querySelector("#Priority");
let btn = document.querySelector("#add");

btn.addEventListener("click", function () {
  if (input_task.value == "") {
    alert("Please enter some task ");
  } else {
    var tbody = document.querySelector("table tbody");

    var tr = document.createElement("tr");

    var taskCell = document.createElement("td");
    taskCell.textContent = input_task.value;
    taskCell.classList.add("input-text");
    tr.appendChild(taskCell);

    // Create and append the second cell with the priority
    var priorityCell = document.createElement("td");
    priorityCell.textContent = priority.value;
    tr.appendChild(priorityCell);

    var statusCell = document.createElement("td");
    var statusRadio = document.createElement("input");
    statusRadio.type = "radio";
    statusRadio.name = "status";
    statusCell.appendChild(statusRadio);
    tr.appendChild(statusCell);

    statusRadio.addEventListener("click", function () {
      taskCell.classList.toggle("highlight-border");
      priorityCell.classList.toggle("highlight-border");

      if (statusRadio.checked) {
        statusRadio.parentNode.classList.add("checked-radio");
      } else {
        statusRadio.parentNode.classList.remove("checked-radio");
      }
    });
    var deleteCell = document.createElement("td");
    var deleteImg = document.createElement("img");
    deleteImg.src = "Delete.png"; // Add the path to your delete icon image here
    deleteImg.alt = "Delete";
    deleteImg.classList.add("delete-icon");
    deleteImg.addEventListener("click", function () {
      tbody.removeChild(tr);
    });
    deleteCell.appendChild(deleteImg);
    tr.appendChild(deleteCell);
    tbody.appendChild(tr);

    input_task.value = "";
    priority.value = "";
  }
});
