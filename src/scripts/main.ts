import '../style/index.scss';
import {Gallery} from "./Gallery";
import {GalleryCard} from "./GalleryCard";
import {SliderModal} from "./SliderModal";
import {Album} from "./Album";

let testGallery: Gallery;
testGallery = new Gallery(document, document.querySelector('#gallery'));
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

const slider = new SliderModal(document, document.querySelector('#slider') as HTMLElement);

const albums: Array<Album> = [];
const maxAlbumsOnPage = 50;
fetch(albumsUrl)
    .then(response => response.json())
    .then(async arrFromJson => {
        for (const item of arrFromJson){
            albums.push(item);
        }
        for (let i = 0; i < maxAlbumsOnPage; i++){
            const album = new Album(albumsUrl + '/' + albums[i].id);
            await album.init();
            const card = new GalleryCard(document, album, () => {
                slider.setAlbum(album);
                slider.show();
            });
            testGallery.addElement(card);
            card.setPreview(album.getPhoto(0).url);
            card.setTitle(album.title);
            await fetch(usersUrl + '/' + albums[i].userId)
                .then(response => response.json())
                .then(json => card.setAuthor(json.username));
        }
    })
