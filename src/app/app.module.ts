import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HistoryComponent } from './pages/history/history.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpotifyService } from './spotify.service';
import { GlobalService } from './global.service';
import { TracksListComponent } from './partials/tracks-list/tracks-list.component';
import { SpotifyTokenRedirectComponent } from './pages/spotify-token-redirect/spotify-token-redirect.component';
import { AlbumComponent } from './pages/album/album.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { SongsComponent } from './pages/songs/songs.component';
import { ArtistAlbumsComponent } from './partials/artist-albums/artist-albums.component';
import { ArtistDetailsComponent } from './partials/artist-details/artist-details.component';
import { FeaturedArtistsComponent } from './partials/featured-artists/featured-artists.component';
import { FeaturedTracksComponent } from './partials/featured-tracks/featured-tracks.component';
import { NewReleasesComponent } from './partials/new-releases/new-releases.component';
import { TopTracksComponent } from './partials/top-tracks/top-tracks.component';
import { SearchComponent } from './pages/search/search.component';
import { AlbumsListComponent } from './partials/albums-list/albums-list.component';
import { PlaylistsListComponent } from './partials/playlists-list/playlists-list.component';
import { ArtistsListComponent } from './partials/artists-list/artists-list.component';
import { FeaturedPlaylistsComponent } from './partials/featured-playlists/featured-playlists.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  declarations: [
    AppComponent,
    HistoryComponent,
    ArtistComponent,
    HeaderComponent,
    SidebarComponent,
    TracksListComponent,
    SpotifyTokenRedirectComponent,
    AlbumComponent,
    AlbumsComponent,
    ArtistsComponent,
    DiscoverComponent,
    PlaylistComponent,
    PlaylistsComponent,
    SongsComponent,
    ArtistAlbumsComponent,
    ArtistDetailsComponent,
    FeaturedArtistsComponent,
    FeaturedTracksComponent,
    NewReleasesComponent,
    TopTracksComponent,
    SearchComponent,
    AlbumsListComponent,
    PlaylistsListComponent,
    ArtistsListComponent,
    FeaturedPlaylistsComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [
    GlobalService,
    SpotifyService
  ]
})
export class AppModule { }
