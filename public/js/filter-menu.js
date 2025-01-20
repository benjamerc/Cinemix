const filterMenu = document.querySelector('.filter-menu-background')
const filterMenuOption = document.getElementById('filter-menu-option')
const closeButton = document.getElementById('close-button')

filterMenuOption.addEventListener('click', () => {
  filterMenu.classList.toggle('show')
})

closeButton.addEventListener('click', () => {
  filterMenu.classList.remove('show')
})

window.addEventListener('popstate', () => {
  filterMenu.classList.remove('show')
})

document.addEventListener('click', (event) => {
  const target = event.target
  if (target.tagName === 'A' && target.hasAttribute('href')) {
    filterMenu.classList.remove('show')
  }
})
