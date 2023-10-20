document.addEventListener('DOMContentLoaded',()=>{
  

  const eventSource = new EventSource("/events");
  eventSource.addEventListener("open", (e) => {
      console.log("The connection has been established.");
    });
  eventSource.addEventListener("message", (event) => {
  // Maneja el evento y actualiza la página según sea necesario
  const data = JSON.parse(event.data);
  console.log("Se ha actualizado la información:", data);
  location.reload()
});

const botones = document.querySelectorAll('.btn-action')
console.log(botones)
})