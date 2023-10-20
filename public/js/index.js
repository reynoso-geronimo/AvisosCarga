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

const btnEdit = document.querySelectorAll('.btn-edit-a')
  btnEdit.forEach(btn => {
    btn.addEventListener("click",()=>{
      document.getElementById("spinner").classList.add("show");
    })
  });
   
    const btnDelete = document.querySelectorAll('#delete-file')
    btnDelete.forEach(btn => {
      btn.addEventListener("submit",()=>{
        document.getElementById("spinner").classList.add("show");
      })
    });
    

})
window.addEventListener("unload", () => {
  btnEdit.removeEventListener("click", showSpinner);
});