import {GalleryCard} from '../../GalleryCardForMVC';
import {GalleryCardTemplate} from '../../Types';

export class ViewGallery {
    private cardArray: Array<GalleryCard>;

    private galleryBtn: HTMLElement;

    private galleryCardArea: HTMLElement;

    constructor(private domModel: Document, private element: HTMLElement) {
        this.cardArray = [];

        this.galleryCardArea = domModel.createElement('div');
        this.galleryCardArea.classList.add('gallery__card-area');
        element.appendChild(this.galleryCardArea);

        this.galleryBtn = domModel.createElement('div');
        this.galleryBtn.classList.add('gallery__btn');
        element.appendChild(this.galleryBtn);
    }

    public addNewCard(
        options: GalleryCardTemplate,
        clickEvent?: (e: Event) => void
    ): void {
        const card = new GalleryCard(this.domModel, options);
        card.getNode().classList.add('gallery__card');
        this.cardArray.push(card);
        this.galleryCardArea.appendChild(card.getNode());
        if (!clickEvent) return;
        card.setMainClickEvent(clickEvent);
    }

    private toggleBtn() {
        this.galleryBtn.classList.toggle('gallery__btn--hide');
    }

    public setBtnClickEvent(callback: () => void) {
        this.galleryBtn.addEventListener('click', async () => {
            this.toggleBtn();
            await callback();
            this.toggleBtn();
        });
    }
}
