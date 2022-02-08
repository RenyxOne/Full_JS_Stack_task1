import '../style/index.scss';
import {Gallery} from "./Gallery";
import {GalleryCard} from "./GalleryCard";
import {SliderModal} from "./SliderModal";
import {Album} from "./Album";
import * as assert from "assert";

const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const $gallery = document.querySelector('#gallery');
const testGallery = new Gallery(document, $gallery);
const $slider = document.querySelector('#slider');
const slider = new SliderModal(document, $slider as HTMLElement);
const albums: Array<Album> = [];
const defaultAlbumsOnPage = 8;

const loadOneMoreAlbum = (() => {
    let currentAlbum = 0;
    return async () => {
        if (currentAlbum >= albums.length) return;
        const album = new Album(albumsUrl + '/' + albums[currentAlbum].id);
        await album.init();
        const card = new GalleryCard(document, album, () => {
            slider.setAlbum(album);
            slider.show();
        });
        testGallery.addElement(card);
        card.setPreview(album.getPhoto(0).thumbnailUrl);
        card.setTitle(album.title);
        await fetch(usersUrl + '/' + albums[currentAlbum].userId)
            .then(response => response.json())
            .then(json => card.setAuthor(json.username));
        currentAlbum++;
    }
})();

document.addEventListener( 'DOMContentLoaded',() => {
    fetch(albumsUrl)
        .then(response => response.json())
        .then(async arrFromJson => {
            for (const item of arrFromJson){
                albums.push(item);
            }
            for (let i = 0; i < defaultAlbumsOnPage; i++){
                await loadOneMoreAlbum();
            }
        });

    testGallery.setBtnFunc(async () => {
        for (let i = 0; i < defaultAlbumsOnPage; i++){
            await loadOneMoreAlbum();
        }
    });

    // window.addEventListener('scroll', (() => {
    //     let loading = false;
    //     return async () => {
    //         if (loading) return;
    //         loading = true;
    //         const contentHeight = $gallery!.offsetHeight;
    //         const yOffset = window.pageYOffset;
    //         const window_height = window.innerHeight;
    //         const y = yOffset + window_height;
    //
    //         if(y >= contentHeight)
    //         {
    //
    //             console.log('BLYAT');
    //             for (let i = 0; i < defaultAlbumsOnPage; i++){
    //                 await loadOneMoreAlbum();
    //             }
    //         }
    //         loading = false;
    //     }
    // })())
});
