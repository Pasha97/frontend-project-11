const createFeedElement = ({ title, description }) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'p-0');

    const heading = document.createElement('h3');
    heading.classList.add('h6', 'mb-0');
    heading.textContent = title;

    const text = document.createElement('p');
    text.classList.add('mb-0', 'small', 'text-black-50');
    text.textContent = description;

    item.append(heading, text);

    return item;
};

const renderFeeds = (elements, state) => {
    const { feedsContainer } = elements

    feedsContainer.innerHTML = '';

    const feedItems = state.feeds.map(item => createFeedElement(item));

    feedsContainer.append(...feedItems);
}

export default renderFeeds