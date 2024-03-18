document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("addTaskForm");
  const tasksTableBody = document.querySelector("#tasksTable tbody");
  const viewCompletedTasksButton = document.getElementById("viewCompletedTasks");

  function saveTasksToLocalStorage() {
      const tasks = [];
      tasksTableBody.querySelectorAll("tr").forEach(taskRow => {
          const taskDescription = taskRow.cells[0].textContent;
          const dueDate = taskRow.cells[1].textContent;
          const completed = taskRow.classList.contains("completed");
          tasks.push({ description: taskDescription, date: dueDate, completed: completed });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
          const taskRow = document.createElement("tr");
          const taskDescriptionCell = document.createElement("td");
          taskDescriptionCell.textContent = task.description;
          taskRow.appendChild(taskDescriptionCell);

          const dueDateCell = document.createElement("td");
          dueDateCell.textContent = task.date;
          taskRow.appendChild(dueDateCell);

          const taskStatusCell = document.createElement("td");
          const taskStatusCheckbox = document.createElement("input");
          taskStatusCheckbox.type = "checkbox";
          taskStatusCheckbox.checked = task.completed;
          taskStatusCell.appendChild(taskStatusCheckbox);
          taskRow.appendChild(taskStatusCell);

          const actionsCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("deleteTask");
          actionsCell.appendChild(deleteButton);

          const markCompletedButton = document.createElement("button");
          markCompletedButton.textContent = "Valider";
          markCompletedButton.classList.add("markCompleted");
          actionsCell.appendChild(markCompletedButton);

          taskRow.appendChild(actionsCell);

          tasksTableBody.appendChild(taskRow);

          // Ajouter des gestionnaires d'événements pour supprimer et valider la tâche
          deleteButton.addEventListener("click", () => {
              taskRow.remove();
              saveTasksToLocalStorage();
          });

          markCompletedButton.addEventListener("click", () => {
              taskRow.classList.add("completed");
              taskRow.remove(); // Supprime la tâche de la liste après l'avoir marquée comme complétée
              saveTasksToLocalStorage();
          });
      });
  }

  loadTasksFromLocalStorage();

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskDescription = document.getElementById("taskDescription").value;
      const dueDate = document.getElementById("dueDate").value;

      if (taskDescription && dueDate) {
          const taskRow = document.createElement("tr");
          const taskDescriptionCell = document.createElement("td");
          taskDescriptionCell.textContent = taskDescription;
          taskRow.appendChild(taskDescriptionCell);

          const dueDateCell = document.createElement("td");
          dueDateCell.textContent = dueDate;
          taskRow.appendChild(dueDateCell);

          const taskStatusCell = document.createElement("td");
          const taskStatusCheckbox = document.createElement("input");
          taskStatusCheckbox.type = "checkbox";
          taskStatusCheckbox.checked = false; // Nouvelle tâche, donc par défaut non complétée
          taskStatusCell.appendChild(taskStatusCheckbox);
          taskRow.appendChild(taskStatusCell);

          const actionsCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("deleteTask");
          actionsCell.appendChild(deleteButton);

          const markCompletedButton = document.createElement("button");
          markCompletedButton.textContent = "Valider";
          markCompletedButton.classList.add("markCompleted");
          actionsCell.appendChild(markCompletedButton);

          taskRow.appendChild(actionsCell);

          tasksTableBody.appendChild(taskRow);
          saveTasksToLocalStorage();
          form.reset();

          // Ajouter des gestionnaires d'événements pour supprimer et valider la tâche
          deleteButton.addEventListener("click", () => {
              taskRow.remove();
              saveTasksToLocalStorage();
          });

          markCompletedButton.addEventListener("click", () => {
              taskRow.classList.add("completed");
              taskRow.remove(); // Supprime la tâche de la liste après l'avoir marquée comme complétée
              saveTasksToLocalStorage();
          });
      } else {
          console.error("Veuillez remplir tous les champs pour ajouter une tâche.");
      }
  });

  viewCompletedTasksButton.addEventListener("click", () => {
      alert("Fonctionnalité à implémenter : Voir les tâches complétées");
      // Fonctionnalité à implémenter : Afficher les tâches complétées
  });
});
