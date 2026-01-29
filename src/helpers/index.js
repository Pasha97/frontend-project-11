import { normalizeItem } from '../utils/common.js'

export const addNewPosts = (state, posts) => {
  const newPosts = posts.filter(post => !state.posts.links.has(post.link))

  newPosts.forEach((post) => {
    state.posts.items.push(normalizeItem(post))
    state.posts.links.add(post.link)
  })
}
