import {GalleryCard} from "./GalleryCard";

export class Gallery {
    private dom;
    private domElement;
    private elements: Array<GalleryCard>;
    constructor(dom: Document, element: any) {
        this.dom = dom;
        this.domElement = element;
        this.domElement.className = 'gallery';
        this.elements = [];
    }

    addElement(card: GalleryCard) {
        this.elements.push(card);
        const cardNode = card.getNode();
        cardNode.classList.add('gallery__card');
        this.domElement.appendChild(card.getNode());
    }

}
