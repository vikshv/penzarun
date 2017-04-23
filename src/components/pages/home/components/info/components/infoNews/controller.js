export default class NewsController {
    constructor(NewsService) {
        'ngInject';

        this._loadNews(NewsService);
    }

    _loadNews(NewsService) {
        const options = {
            limitToLast: 3
        };
        this._startLoadProgress();
        NewsService.loadNews(options)
            .then(result => {
                this.news = result;
            })
            .then(() => {
                this._stopLoadProgress();
            })
            .catch(error => {
                this._stopLoadProgress();
                throw Error(error);
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
}
