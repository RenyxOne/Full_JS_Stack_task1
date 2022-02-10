import '../style/index.scss';
import { Gallery } from './Gallery';
import { GalleryCard } from './GalleryCard';
import { SliderModal } from './SliderModal';
import { Album } from './Album';

const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const model: Document = document;

const galleryNode: HTMLElement =
  model.querySelector('#gallery') ?? model.createElement('div');
const sliderNode: HTMLElement =
  model.querySelector('#slider') ?? model.createElement('div');

const testGallery = new Gallery(model, galleryNode);
const slider = new SliderModal(model, sliderNode);
const albums: Array<Album> = [];
const defaultAlbumsOnPage = 8;

const albumIterator = function* getAlbumFromAlbumsArrayGenerator(
  arr: Array<Album>
) {
  for (const album of arr) {
    yield album;
  }
  return null;
};
const albumsIteratorForPage = albumIterator(albums);
const loadOneMoreAlbum = async () => {
  const currentAlbum = albumsIteratorForPage.next().value;
  if (!currentAlbum) {
    return;
  }

  const album = new Album(
    `${albumsUrl}/${currentAlbum.id}`,
    `${usersUrl}/${currentAlbum.userId}`
  );
  await album.init();

  const card = new GalleryCard(model, album, () => {
    slider.setAlbum(album);
    slider.show();
  });
  await card.init();

  testGallery.addElement(card);
};

model.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch(albumsUrl);
  const jsonArray = await response.json();

  for (const item of jsonArray) {
    albums.push(item);
  }
  const results = [];
  for (let i = 0; i < defaultAlbumsOnPage; i += 1) {
    results.push(loadOneMoreAlbum());
  }
  await Promise.all(results);

  testGallery.setBtnFunc(async () => {
    const promises = [];
    for (let i = 0; i < defaultAlbumsOnPage; i += 1) {
      promises.push(loadOneMoreAlbum());
    }
    await Promise.all(promises);
  });
});
