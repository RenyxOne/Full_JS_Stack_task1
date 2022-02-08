import {GalleryCard} from "./GalleryCard";

export class Gallery {
    private dom;
    private $gallery;
    private elements: Array<GalleryCard>;
    constructor(dom: Document, element: any) {
        this.dom = dom;
        this.$gallery = element;
        this.$gallery.className = 'gallery';
        this.$gallery.innerHTML = `
            <div class="gallery__card-area"></div>
            <div class="gallery__btn"></div>
        `;
        this.elements = [];
    }

    setBtnFunc (func: Function){
        const $btn = this.$gallery.querySelector('.gallery__btn');
        $btn!.addEventListener('click', async () => {
            $btn.classList.add('gallery__btn--hide');
            await func()
            $btn.classList.remove('gallery__btn--hide');
        });
    }

    addElement(card: GalleryCard) {
        this.elements.push(card);
        const cardNode = card.getNode();
        cardNode.classList.add('gallery__card');
        this.$gallery.querySelector('.gallery__card-area').appendChild(card.getNode());
    }

}
