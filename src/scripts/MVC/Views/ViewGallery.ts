import {GalleryCard} from './GalleryCardForMVC';
import {Album, GalleryCardTemplate} from '../../Types';
// import {ControllerSlider} from '../Controllers/ControllerSlider';

export class ViewGallery {
    private cardArray: Array<GalleryCard>;

    private galleryBtn: HTMLElement;

    private galleryCardArea: HTMLElement;

    constructor(
        private domModel: Document,
        private element: HTMLElement // private slider: ControllerSlider
    ) {
        this.cardArray = [];

        this.galleryCardArea = domModel.createElement('div');
        this.galleryCardArea.classList.add('gallery__card-area');
        element.appendChild(this.galleryCardArea);

        this.galleryBtn = domModel.createElement('div');
        this.galleryBtn.classList.add('gallery__btn');
        element.appendChild(this.galleryBtn);
    }

    public addNewCard(options: GalleryCardTemplate, album: Album): void {
        const card = new GalleryCard(this.domModel, options);
        card.getNode().classList.add('gallery__card');
        this.cardArray.push(card);
        this.galleryCardArea.appendChild(card.getNode());
        // card.setMainClickEvent((e) => {
        //     this.slider.setAlbum(album);
        //     this.slider.open();
        // });
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
