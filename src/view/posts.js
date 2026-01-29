const createPostElement = ({ title, id, link }, state) => {
  const item = document.createElement('li')
  item.classList.add('list-group-item', 'mb-4', 'border-0', 'd-flex', 'justify-content-between', 'align-items-center', 'p-0')

  const linkElement = document.createElement('a')
  linkElement.href = link
  linkElement.textContent = title

  const classTitle = state.posts.viewedIds.has(id) ? 'fw-normal' : 'fw-bold'
  linkElement.classList.add(classTitle)

  const btn = document.createElement('button')
  btn.classList.add('btn', 'btn-outline-primary', 'btn-sm')
  btn.textContent = 'Просмотр'
  btn.setAttribute('type', 'button')
  btn.setAttribute('postId', id)
  btn.setAttribute('data-bs-toggle', 'modal')
  btn.setAttribute('data-bs-target', '#modal')

  item.append(linkElement, btn)

  return item
}

const renderFeeds = (elements, state) => {
  const { postsContainer } = elements

  postsContainer.innerHTML = ''

  const titleBlock = document.createElement('h2')
  titleBlock.classList.add('h4')
  titleBlock.textContent = 'Посты'

  const listContainer = document.createElement('ul')
  listContainer.classList.add('list-group')

  const postItems = state.posts.items.map(item => createPostElement(item, state))

  listContainer.append(...postItems)
  postsContainer.append(titleBlock, listContainer)
}

export default renderFeeds
