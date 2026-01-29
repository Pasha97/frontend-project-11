const createFeedElement = ({ title, description }) => {
  const item = document.createElement('li')
  item.classList.add('list-group-item', 'border-0', 'p-0')

  const heading = document.createElement('h3')
  heading.classList.add('h6', 'mb-0')
  heading.textContent = title

  const text = document.createElement('p')
  text.classList.add('mb-0', 'small', 'text-black-50')
  text.textContent = description

  item.append(heading, text)

  return item
}

const renderFeeds = (elements, state) => {
  const { feedsContainer } = elements

  feedsContainer.innerHTML = ''

  const titleBlock = document.createElement('h2')
  titleBlock.classList.add('h4')
  titleBlock.textContent = 'Фиды'

  const listContainer = document.createElement('ul')
  listContainer.classList.add('list-group')

  const feedItems = state.feeds.map(item => createFeedElement(item))
  listContainer.append(...feedItems)
  feedsContainer.append(titleBlock, listContainer)
}

export default renderFeeds
