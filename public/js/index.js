document.addEventListener('DOMContentLoaded', () => {

  // Solicitar permiso de notificación cuando se carga la página
  Notification.requestPermission();

  const eventSource = new EventSource("/events");
  eventSource.addEventListener("open", (e) => {
    console.log("La conexión se ha establecido.");
  });
  eventSource.addEventListener("message", (event) => {
  
    const data = JSON.parse(event.data);
    console.log("Se ha actualizado la información:", data.data.aviso);

    if (Notification.permission === "granted" && data.data.aviso.estado != undefined && data.data.aviso.estado == "error") {
      new Notification("Nuevo mensaje", {
        body: "Ocurrió un error al generar el aviso",
      });
    }

    location.reload();
  });

  const btnEdit = document.querySelectorAll('.btn-edit-a');
  btnEdit.forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("spinner").classList.add("show");
    });
  });

  const btnDelete = document.querySelectorAll('#delete-file');
  btnDelete.forEach(btn => {
    btn.addEventListener("submit", () => {
      document.getElementById("spinner").classList.add("show");
    });
  });
});


window.addEventListener("unload", () => {
  btnEdit.forEach(btn => {
    btn.removeEventListener("click", () => {
      document.getElementById("spinner").classList.add("show");
    });
  });
});