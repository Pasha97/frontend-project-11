import './style.css'
import 'bootstrap'
import onChange from "on-change";

import { renderForm, renderPosts, renderFeeds, renderModal } from './view'
import { initI18n } from "./i18n";
import { validate } from "./validate";
import {
    FEEDS_SELECTOR,
    FORM_BTN_SELECTOR,
    FORM_INPUT_SELECTOR,
    FORM_MESSAGE_SELECTOR,
    POSTS_SELECTOR, REQUEST_STATUS,
    STATUS
} from "./constants";
import { loadRssFeed } from "./api/rss.js";
import { addNewPosts } from "./helpers/index.js";
import { normalizeItem } from "./utils/common.js";

const POSTS_UPDATE_INTERVAL = 5000;

const initialState = {
    form: {
        value: '',
        status: '',
        message: '',
    },
    request: {
        status: REQUEST_STATUS.IDLE,
    },
    urls: [],
    posts: {
        items: [],
        links: new Set(),
        viewedIds: new Set(),
    },
    feeds: []
}

const elements = {
    input: document.querySelector(FORM_INPUT_SELECTOR),
    submit: document.querySelector(FORM_BTN_SELECTOR),
    message: document.querySelector(FORM_MESSAGE_SELECTOR),
    feedsContainer: document.querySelector(FEEDS_SELECTOR),
    postsContainer: document.querySelector(POSTS_SELECTOR),
}

initI18n().then((i18nInstance) => {
    const state = onChange(initialState, (path) => {
        if (path.includes('form')) {
            renderForm(elements, initialState, i18nInstance)
        }

        if (path.includes('request')) {
            renderForm(elements, initialState, i18nInstance);
            renderFeeds(elements, initialState)
            renderPosts(elements, initialState)
        }

        if (path.includes('posts.viewedIds')) {
            renderPosts(elements, initialState)
        }
    })

    const checkNewPosts = () => {
        if (!state.urls.length) {
            return;
        }

        const promises = state.urls.map((url) =>
            loadRssFeed(url)
                .then((feeds) => {
                    addNewPosts(state, feeds.items);
                })
                .catch((err) => {
                    console.warn(`Error loading RSS ${url}:`, err);
                })
        );

        Promise.allSettled(promises).finally(() => {
            setTimeout(checkNewPosts, POSTS_UPDATE_INTERVAL);
        })
    };

    elements.postsContainer.addEventListener('click', (e) => {
        const postId = e.target.getAttribute('postId');

        if (!postId) {
            return;
        }

        state.posts.viewedIds.add(postId);
        const post = state.posts.items.find(item => item.id === postId);
        renderModal(post)
    });

    elements.submit.onclick = (e) => {
        e.preventDefault()

        const url = elements.input.value;

        validate(url, state.urls)
            .then(({ isValid, error }) => {
                if (isValid) {
                    state.request.status = REQUEST_STATUS.LOADING;
                    state.form.status = STATUS.VALIDATE;

                    loadRssFeed(url).then(feeds => {
                        state.urls.push(url)

                        const feedItem = { title: feeds.title, description: feeds.description }
                        state.feeds.push(normalizeItem(feedItem));
                        addNewPosts(state, feeds.items);

                        state.form.value = ''
                        state.form.message = 'messages.success.add';
                        state.request.status = REQUEST_STATUS.SUCCESS;

                        if (state.urls.length === 1) {
                            setTimeout(checkNewPosts, POSTS_UPDATE_INTERVAL);
                        }
                    }).catch((err) => {
                        state.form.status = err;
                        state.form.message = err.message;
                        state.request.status = REQUEST_STATUS.ERROR;
                    })
                } else {
                    state.form.status = STATUS.INVALIDATE;
                    state.form.message = error
                }
            })
    }
})

