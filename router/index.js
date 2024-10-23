import { createRouter, createWebHistory } from 'vue-router';
import AlbumsView from '../views/AlbumsView.vue';
import AlbumDetailView from '../views/AlbumDetailView.vue';
import EditAlbumView from '../views/EditAlbumView.vue';
import ArtistsView from '../views/ArtistsView.vue';
import RecordsView from '../views/RecordsView.vue';
import ArtistDetailView from '../views/ArtistDetailView.vue';
import RecordDetailView from '../views/RecordDetailView.vue';
import EditArtistView from '../views/EditArtistView.vue';
import EditRecordView from '../views/EditRecordView.vue'; 

const routes = [
  {
    path: '/albums',
    name: 'AlbumsView',
    component: AlbumsView,
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: AlbumDetailView,
    props: true,
  },
  {
    path: '/albums/edit/:id',
    name: 'EditAlbum',
    component: EditAlbumView,
    props: true,
  },
  {
    path: '/albums/new',
    name: 'NewAlbum',
    component: EditAlbumView,
  },
  {
    path: '/artists',
    name: 'ArtistsView',
    component: ArtistsView,
  },
  {
    path: '/artists/:id',
    name: 'ArtistDetail',
    component: ArtistDetailView,
    props: true,
  },
  {
    path: '/artists/edit/:id',
    name: 'EditArtist',
    component: EditArtistView,
    props: true,
  },
  {
    path: '/artists/new',
    name: 'NewArtist',
    component: EditArtistView,
  },
  {
    path: '/records',
    name: 'RecordsView',
    component: RecordsView,
  },
  {
    path: '/label_records/:id',
    name: 'RecordDetail',
    component: RecordDetailView,
    props: true,
  },
  {
    path: '/label_records/edit/:id',
    name: 'EditRecord',
    component: EditRecordView,
    props: true,
  },
  {
    path: '/label_records/new',
    name: 'NewRecord',
    component: EditRecordView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
