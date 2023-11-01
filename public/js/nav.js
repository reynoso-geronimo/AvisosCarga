document.addEventListener('DOMContentLoaded',()=>{
    const warning = localStorage.getItem('warning')
    if(warning>0){
        document.querySelector('.error-warning').style.display="block"
        document.querySelector('.error-warning__text').innerText=warning
    }
})