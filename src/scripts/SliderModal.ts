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
        if (!this.album) return;

        const photo = this.album.getPhoto(this.currentPhotoIndex);
        this.setPhoto(photo);
    }

    private initEvents() {
        try {
            const leftArrow = this.objNode.querySelector('.slider__arrow-left');
            const rightArrow = this.objNode.querySelector('.slider__arrow-right');
            const overlay = this.objNode.querySelector('.my-modal__overlay');
            if (!leftArrow || !rightArrow || !overlay) {
                throw 'SliderModal have incorrect structure';
            }
            leftArrow.addEventListener('click', () =>this.prevPhoto());
            rightArrow.addEventListener('click', () =>this.nextPhoto());
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hide();
                }
            });
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    private setPhoto(photo: Photo) {
        if (!this.album) return;

        try {
            const sliderImg = this.objNode.querySelector('.slider__img');
            const windowTittle = this.objNode.querySelector('.window__title');
            const windowCounter = this.objNode.querySelector('.window__counter');
            if (!sliderImg || !windowTittle || !windowCounter) {
                throw 'SliderModal have incorrect structure';
            }
            sliderImg.setAttribute('src', photo.url);
            windowTittle.textContent = photo.title;
            windowCounter.textContent = `${this.currentPhotoIndex+1} of ${this.album.getSize()}`
        }
        catch (e) {
            console.error(e);
            throw e;
        }
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
