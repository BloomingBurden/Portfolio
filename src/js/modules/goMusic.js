export class GoMusic {
    constructor(path='') {
        this._path = path;
        this._body = document.querySelector('.index-body');

        this.goMusic();
    }

    goMusic() {
        const music = document.createElement('audio');
        const start = document.querySelector('.layer__start');
        
        if (!this._body) return;

        music.setAttribute('src', this._path );
        music.setAttribute('style', 'display: none');
        music.setAttribute('autoplay', 'true');
        music.setAttribute('loop', 'true');
        this._body.append(music);

        if (!start) return;

        start.addEventListener('click', () => {
            music.play();
        });
    }
}