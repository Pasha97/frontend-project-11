const createPostElement = ({ title, id, link }) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'mb-4', 'border-0', 'd-flex', 'justify-content-between', 'align-items-center', 'p-0');

    const heading = document.createElement('h3');
    heading.classList.add('h5', 'mb-0');
    heading.textContent = title;

    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.append(heading);

    const btn = document.createElement('div');
    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btn.textContent = 'Просмотр';
    btn.id = id;

    item.append(linkElement, btn);

    return item;
};

const renderFeeds = (elements, state) => {
    const { postsContainer } = elements

    postsContainer.innerHTML = '';

    const postItems = state.posts.map(item => createPostElement(item));

    postsContainer.append(...postItems);
}

export default renderFeeds