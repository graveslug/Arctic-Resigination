
const navBarBurger = document.querySelector('.navbar-burger')
const navMenu = document.querySelector('.navbar-menu')

navBarBurger.onclick = (event) => {
    event.target.classList.toggle('is-active')
    navMenu.classList.toggle('is-active')
}
