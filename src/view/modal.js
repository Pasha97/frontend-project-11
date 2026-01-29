import { MODAL_DESCRIPTION_SELECTOR, MODAL_LINK_SELECTOR, MODAL_TITLE_SELECTOR } from '../constants'

const renderModal = ({ title, description, link }) => {
  const titleBlock = document.querySelector(MODAL_TITLE_SELECTOR)
  const descriptionBlock = document.querySelector(MODAL_DESCRIPTION_SELECTOR)
  const linkBlock = document.querySelector(MODAL_LINK_SELECTOR)

  titleBlock.textContent = title
  descriptionBlock.textContent = description
  linkBlock.href = link
}

export default renderModal
