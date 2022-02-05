import {Album, Photo} from "./Album";

export class SliderModal {
    private model: Document;
    private objNode: HTMLElement;
    private currentPhotoIndex: number;
    private album: Album | null;

    constructor(model: Document, element: HTMLElement) {
        this.model = model;
        this.objNode = element;
        this.objNode.classList.add('my-modal');
        this.objNode.innerHTML = `
        <div class="my-modal__overlay">
            <div class="my-modal__window window">
                <div class="window__header">
                    <div class="window__title text-with-bg">header</div>
                </div>
                <div class="window__main">
                    <div class="slider">
                        <div class="slider__arrow-left"></div>
                        <div class="slider__arrow-right"></div>
                        <img class="slider__img" src="../assets/card/test-card-img.jpg" alt="">
                    </div>
                </div>
                <div class="window__footer">
                    <div class="window__counter text-with-bg">footer</div>
                </div>
            </div>
        </div>
        `
        this.currentPhotoIndex = -1;
        this.album = null;

        this.initEvents();
    }

    setAlbum(album: Album) {
        this.album = album;
        this.currentPhotoIndex = 0;
        this.setCurrentPhoto();
    }

    private setCurrentPhoto(){
        const photo = this.album!.getPhoto(this.currentPhotoIndex);
        this.setPhoto(photo);
    }
    private initEvents() {
        this.objNode.querySelector('.slider__arrow-left')!
            .addEventListener('click', () =>this.prevPhoto());

        this.objNode.querySelector('.slider__arrow-right')!
            .addEventListener('click', () =>this.nextPhoto());

        const overlay = this.objNode.querySelector('.my-modal__overlay');
            overlay!.addEventListener('click', (e) => e.target === overlay && this.hide());
    }
    private setPhoto(photo: Photo) {
        this.objNode.querySelector('.slider__img')!
            .setAttribute('src', photo.url)

        this.objNode.querySelector('.window__title')!
            .textContent = photo.title;

        this.objNode.querySelector('.window__counter')!
            .textContent = this.currentPhotoIndex+1 + ' of ' + String(this.album?.getSize());
    }

    show() {
        this.objNode.classList.add('my-modal--show');
    }

    hide() {
        this.objNode.classList.remove('my-modal--show');
    }

    nextPhoto() {
        if (!this.album) return;
        this.currentPhotoIndex++;

        if (this.currentPhotoIndex >= this.album.getSize()) {
            this.currentPhotoIndex = 0;
        }

        this.setCurrentPhoto();
    }

    prevPhoto() {
        if (!this.album) return;
        this.currentPhotoIndex--;

        if (this.currentPhotoIndex < 0) {
            this.currentPhotoIndex = this.album.getSize()-1;
        }

        this.setCurrentPhoto();
    }
}
