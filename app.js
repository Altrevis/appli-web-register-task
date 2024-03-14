document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addTaskForm");
    const tasksTableBody = document.querySelector("#tasksTable tbody");
  
    // Fonction pour sauvegarder les tâches dans le localStorage
    function saveTasksToLocalStorage() {
      const tasks = [];
      tasksTableBody.querySelectorAll("tr").forEach(taskRow => {
        const taskDescription = taskRow.cells[0].textContent;
        const dueDate = taskRow.cells[1].textContent;
        tasks.push({ description: taskDescription, date: dueDate });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Fonction pour charger les tâches depuis le localStorage
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        const taskRow = document.createElement("tr");
        taskRow.innerHTML = `
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>
                <button class="deleteTask">Delete</button>
            </td>
        `;
        tasksTableBody.appendChild(taskRow);
  
        // Ajouter un gestionnaire d'événements pour supprimer la tâche
        taskRow.querySelector(".deleteTask").addEventListener("click", () => {
          taskRow.remove();
          saveTasksToLocalStorage(); // Mettre à jour le localStorage après la suppression
        });
      });
    }
  
    // Charger les tâches au chargement de la page
    loadTasksFromLocalStorage();
  
    // Gérer l'ajout de tâches
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskDescription = document.getElementById("taskDescription").value;
      const dueDate = document.getElementById("dueDate").value;
  
      if (taskDescription && dueDate) {
        const taskRow = document.createElement("tr");
        taskRow.innerHTML = `
            <td>${taskDescription}</td>
            <td>${dueDate}</td>
            <td>
                <button class="deleteTask">Delete</button>
            </td>
        `;
        tasksTableBody.appendChild(taskRow);
        saveTasksToLocalStorage(); // Sauvegarder la tâche ajoutée
        form.reset();
        
        // Ajouter un gestionnaire d'événements pour supprimer la tâche
        taskRow.querySelector(".deleteTask").addEventListener("click", () => {
          taskRow.remove();
          saveTasksToLocalStorage(); // Mettre à jour le localStorage après la suppression
        });
      } else {
        console.error("Veuillez remplir tous les champs pour ajouter une tâche.");
      }
    });
  });
  