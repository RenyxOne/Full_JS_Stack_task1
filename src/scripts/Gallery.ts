import { GalleryCard } from './GalleryCard';

export class Gallery {
  private dom: Document;

  private galleryNode: HTMLElement;

  private elements: Array<GalleryCard>;

  public currentAlbum: number;

  constructor(dom: Document, element: any) {
    this.dom = dom;
    this.galleryNode = element;
    this.galleryNode.className = 'gallery';
    this.galleryNode.innerHTML = `
            <div class="gallery__card-area"></div>
            <div class="gallery__btn"></div>
        `;
    this.elements = [];
    this.currentAlbum = 0;
  }

  setBtnFunc(callback: () => void) {
    const btnNode = this.galleryNode.querySelector('.gallery__btn');
    if (!btnNode) return;

    btnNode.addEventListener('click', async () => {
      btnNode.classList.add('gallery__btn--hide');
      await callback();
      btnNode.classList.remove('gallery__btn--hide');
    });
  }

  addElement(card: GalleryCard) {
    try {
      this.elements.push(card);
      const cardNode = card.getNode();
      cardNode.classList.add('gallery__card');
      const cardArea = this.galleryNode.querySelector('.gallery__card-area');
      if (!cardArea) {
        throw Error('incorrect Gallery Structure');
      }
      cardArea.appendChild(cardNode);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
