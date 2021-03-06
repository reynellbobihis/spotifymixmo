import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { SpotifyService } from 'src/app/spotify.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: any;
  uploadForm: any;
  progress: any;
  files = [];
  dialogRef: any;
  editMode: boolean = false;
  displayedColumns: string[];
  selection: any;

  constructor(private dialog: MatDialog, private spotifyService: SpotifyService, private router: Router, private globalService: GlobalService) {
    this.uploadForm = {};
    this.progress = {};
    this.progress.total = 0;
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit() {
    setInterval(() => {
      if (JSON.stringify(this.playlists) !== JSON.stringify(this.globalService.playlists)) {
        this.playlists = this.globalService.playlists;
        this.setDisplayedDolumns();
      }
    }, 500);
    window.addEventListener('resize', () => this.setDisplayedDolumns());
  }

  setDisplayedDolumns() {
    if (window.innerWidth < 992) this.displayedColumns = ['select', 'image', 'title'];
    else if (window.innerWidth < 1200) this.displayedColumns = ['select', 'image', 'title', 'tracks'];
    else this.displayedColumns = ['select', 'image', 'title', 'description', 'tracks', 'public', 'collaborative'];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.playlists.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.playlists.forEach(row => this.selection.select(row));
  }

  toggleEditMode() {
    this.selection.clear();
    this.editMode = !this.editMode;
  }

  fileInputChanged(e) {
    this.files = e.target.files;
    e.target.style.position = this.files.length ? 'absolute' : 'static';
  }

  newPlaylist(_fileIndex: number) {
    const fileIndex = _fileIndex || 0;
    const { name } = this.uploadForm;

    if (this.files) {
      const _file:File = this.files[fileIndex];
      const myReader:FileReader = new FileReader();
      const trimFileExt = fileName => fileName.split('.').slice(0, -1).join('.');

      if (this.files.length > 1 || !name) this.uploadForm.name = trimFileExt(_file.name);
      this.progress.file = 0;
      this.progress.total = 0;
      this.progress.fileName = this.uploadForm.name;

      myReader.onloadend = () => {
        const lines = myReader.result.toString().split('\n');
        const size = lines.length;
        const queries = [];
        lines.forEach((line, index) => {
          const arr = trimFileExt(line).split('/');
          let query = arr[arr.length - 1]
            .replace('’', '\'')
            .replace('feat. ', ' ')
            .replace('(', ' ')
            .replace(')', ' ');
          // For tracks inside album folders
          if (/[0-9]{2} - /g.test(query)) {
            const folder = arr[arr.length - 2]
              .replace(/[0-9]{4} /g, '')
              .split(' - ')[0];
            const title = query.replace(/[0-9]{2} - /g, '');
            query = folder + ' ' + title;
          }
  
          if (query) queries.push(query);
          if (size == index + 1) {
            this.search(queries, size, 0, [], fileIndex);
          }
        });
      };

      myReader.readAsText(_file);
    } else {
      this.createPlaylist();
    }
  }

  createPlaylist(uris?: string[], fileIndex?: number) {
    const { name, description } = this.uploadForm
    this.spotifyService.createPlaylist(name, false, description).subscribe(
      result => {
        const { id } = result;
        if (uris) {
          this.addTracksToPlaylist(id, uris, fileIndex);
        } else {
          this.router.navigate([ '/playlist/' + id ]);
        }
      }
    );
  }

  addTracksToPlaylist(id: string, uris: string[], fileIndex: number) {
    this.spotifyService.addTracksToPlaylist(id, uris).subscribe(
      () => {
        if (this.files) {
          const { length } = this.files;

          // this.progress.total = Math.floor(((fileIndex + 1) / length) * 100);
          console.log('Done!');

          if (length > ++fileIndex) {
            setTimeout(() => this.newPlaylist(fileIndex), 1000);
          } else {
            console.log('All done!');
            this.dialogRef.close();
          }
        }
      }
    );
  }

  search(queries: any, size: number, index: number, tracks: string[], fileIndex: number) {
    this.spotifyService.search(queries[index], null, 1, 'track').subscribe(
      result => {
        const uris = tracks;
        const { length } = queries;
        const fileProgress = ((fileIndex + 1) / this.files.length) * 100;

        this.progress.file = Math.floor((index / length) * 100);
        this.progress.total = Math.floor(fileProgress + (index / (length * this.files.length)));

        if (queries[index] && result.tracks.items[0]) uris.push(result.tracks.items[0].uri);
        if (size == ++index) this.createPlaylist(uris, fileIndex);
        else this.search(queries, size, index, uris, fileIndex);
      }
    );
  }

  openAddPlaylistDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(dialog);
    this.dialogRef.afterClosed().subscribe(() => {
      this.uploadForm = {};
      this.files = [];
      this.progress.total = 0;
    });
  }
}
