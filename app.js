document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("addTaskForm");

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskDescription = document.getElementById("taskDescription").value;
      const dueDate = document.getElementById("dueDate").value;

      const tasksTableBody = document.querySelector("#tasksTable tbody");
      
      if (tasksTableBody) {
          const taskRow = document.createElement("tr");
          taskRow.innerHTML = `
              <td>${taskDescription}</td>
              <td>${dueDate}</td>
              <td>
                  <button class="deleteTask">Delete</button>
              </td>
          `;
          
          tasksTableBody.appendChild(taskRow);

          form.reset();

          taskRow.querySelector(".deleteTask").addEventListener("click", () => {
              taskRow.remove();
          });
      } else {
          console.error("Le sélecteur #tasksTable tbody n'a pas trouvé d'élément correspondant dans le DOM.");
      }
  });
});
