import {GalleryCardTemplate} from '../../Types';

export class GalleryCard {
    private readonly card: HTMLElement;

    private readonly cardMain: HTMLDivElement;

    private readonly cardPreview: HTMLImageElement;

    private readonly cardOverlay: HTMLDivElement;

    private readonly cardDescription: HTMLDivElement;

    private readonly cardTitle: HTMLSpanElement;

    private readonly cardAuthor: HTMLDivElement;

    constructor(domModel: Document, options: GalleryCardTemplate) {
        this.card = domModel.createElement('div');
        this.card.classList.add('card');

        this.cardMain = domModel.createElement('div');
        this.cardMain.classList.add('card__main');
        this.card.appendChild(this.cardMain);

        this.cardPreview = domModel.createElement('img');
        this.cardPreview.classList.add('card__img');
        this.cardPreview.src = options.preview;
        this.cardMain.appendChild(this.cardPreview);

        this.cardOverlay = domModel.createElement('div');
        this.cardOverlay.classList.add('card__overlay');
        this.cardMain.appendChild(this.cardOverlay);

        this.cardDescription = domModel.createElement('div');
        this.cardDescription.classList.add('card__description');
        this.cardOverlay.appendChild(this.cardDescription);

        this.cardTitle = domModel.createElement('span');
        this.cardTitle.classList.add('card__title');
        this.cardTitle.innerText = options.title;
        this.cardDescription.appendChild(this.cardTitle);

        this.cardAuthor = domModel.createElement('div');
        this.cardAuthor.classList.add('card__author');
        this.cardAuthor.innerText = options.author;
        this.card.appendChild(this.cardAuthor);
    }

    public setMainClickEvent(callback: (e: Event) => void) {
        this.cardMain.addEventListener('click', callback);
    }

    public setOverlayClickEvent(callback: (e: Event) => void) {
        this.cardMain.addEventListener('click', callback);
    }

    public getNode(): HTMLElement {
        return this.card;
    }
}
