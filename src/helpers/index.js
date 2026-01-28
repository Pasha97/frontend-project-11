import { normalizeItem } from "../utils/common.js";

export const addNewPosts = (state, posts) => {
    const newPosts = posts.filter((post) => !state.postLinks.has(post.link));

    newPosts.forEach((post) => {
        state.posts.push(normalizeItem(post));
        state.postLinks.add(post.link);
    });
};