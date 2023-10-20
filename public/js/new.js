document.addEventListener('DOMContentLoaded', () => {


    const permiso = document.getElementById("permiso");
    const dateTime = document.getElementById("proximoAviso");
    const form = document.getElementById("form")
    const regex = /^(\d{2})(\d{3})([A-Za-z]{2}\d{2})(\d{6}[A-Za-z])$/;



    form.addEventListener('submit', (e) => {
        const selectedDateTime = new Date(dateTime.value);
        const dateNow = new Date();
        let errors = false
        e.preventDefault()
        if (!regex.test(permiso.value)) {
            permiso.classList.add('input-error')
            errors = true
        } if (selectedDateTime < dateNow) {
            dateTime.classList.add('input-error')
            errors = true
        }

        if (!errors) {
            form.submit();
            document.getElementById("spinner").classList.add("show");
        }


    })

})