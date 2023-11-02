document.addEventListener('DOMContentLoaded', () => {
    const dateTime = document.getElementById("proximoAviso");
    let inputs = document.querySelectorAll('input[name="permiso"]');
    const form = document.getElementById("form")
    const regex = /^(\d{2})(\d{3})([A-Za-z]{2}\d{2})(\d{6}[A-Za-z])$/;

    form.addEventListener('submit', (e) => {
        inputs = document.querySelectorAll('input[name="permiso"]');
        dateTime.addEventListener("change", () => {
            dateTime.classList.remove('input-error')
        })
        inputs.forEach((input) => {
            input.addEventListener("change", () => {
                input.classList.remove('input-error')
            });
        })
        const selectedDateTime = new Date(dateTime.value);
        const dateNow = new Date();
        let errors = false
        e.preventDefault()
        inputs.forEach((input) => {
            if (!regex.test(input.value)) {
                input.classList.add("input-error");
                errors = true;
            }
        });

        if (selectedDateTime < dateNow) {
            dateTime.classList.add('input-error')
            errors = true
        }

        if (!errors) {
            document.getElementById("spinner").classList.add("show");
            form.submit();
        }


    })

})
let contadorCamposPermiso = 1;
const btnRemovePermiso = document.querySelector(".btn-remove-permiso");

function agregarCampoPermiso() {
    contadorCamposPermiso++;
    
    const input = document.createElement("input");
    input.type = "text";
    input.name = "permiso";
    input.id = "permiso-" + contadorCamposPermiso;
    input.required = true;
    input.maxLength = 16;
    const label = document.createElement("label");
    label.setAttribute("for", "permiso-" + contadorCamposPermiso);
    label.textContent = "PERMISO " + contadorCamposPermiso;

    const btnAddPermiso = document.querySelector(".btn-add-permiso");
    btnAddPermiso.parentElement.insertBefore(input, btnAddPermiso);
    btnAddPermiso.parentElement.insertBefore(label, btnAddPermiso);

    // Mostrar el botón de "Quitar Último Permiso"
    btnRemovePermiso.style.display = "inline";
}

function quitarUltimoCampoPermiso() {
    if (contadorCamposPermiso > 1) {
        const ultimoInputId = "permiso-" + contadorCamposPermiso;
        const ultimoInput = document.getElementById(ultimoInputId);
        const ultimoLabel = document.querySelector('label[for="' + ultimoInputId + '"]');

        if (ultimoInput && ultimoLabel) {
            ultimoInput.parentElement.removeChild(ultimoInput);
            ultimoLabel.parentElement.removeChild(ultimoLabel);
            contadorCamposPermiso--;


            if (contadorCamposPermiso === 1) {
                btnRemovePermiso.style.display = "none";
            }
        }
    }
}
window.addEventListener("unload", () => {
    btnEdit.removeEventListener("click", showSpinner);
});