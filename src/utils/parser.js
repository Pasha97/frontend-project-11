export const parserRSS = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'application/xml');

    const errorNode = doc.querySelector('parsererror');
    const channel = doc.querySelector('channel');

    if (errorNode || !channel) {
        throw new Error('messages.errors.invalidRss');
    }

    const title = channel.querySelector('title')?.textContent;
    const description = channel.querySelector('description')?.textContent;

    const items = [...doc.querySelectorAll('item')].map((item) => ({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        description: item.querySelector('description')?.textContent,
    }));

    return { title, description, items };

}