import {Album} from "./Album";

export class GalleryCard {
    private dom: Document;
    private album: Album;
    private previewImg: string;
    private cardTitle: string;

    private domElement: HTMLElement;
    constructor(dom:Document, album: Album, onClick: Function) {
        this.dom = dom;
        this.album = album;
        this.previewImg = '';
        this.cardTitle = album.title!;
        this.domElement = this.dom.createElement('div');
        this.initCard();

        this.domElement.querySelector('.card__main')!.addEventListener('click', () => onClick());
    }

    setPreview(url: string){
        this.previewImg = url;
        this.domElement.querySelector('.card__img')!
            .setAttribute('src', this.previewImg);
    }
    setTitle(cardTitle: string){
        const cardTitleNode = this.domElement.querySelector('.card__title') as HTMLSpanElement;
        cardTitleNode.innerText = cardTitle;
    }
    setAuthor(author: string){
        const cardAuthorNode = this.domElement.querySelector('.card__author') as HTMLSpanElement;
        cardAuthorNode.innerText = author;
    }

    private initCard(){
        this.domElement.className = 'card';
        this.domElement.innerHTML = `
            <div class="card__main">
                <div class="card__main">
                    <img class="card__img" src="https://via.placeholder.com/600/8e973b" alt="">
                    <div class="card__overlay">
                        <div class="card__description">
                            <span class="card__title">Title</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card__footer">
                <div class="card__footer">
                    <div class="card__author">Author</div>
                </div>
            </div>
        `;
    }

    public getNode(): HTMLElement{
        return this.domElement;
    }
}
