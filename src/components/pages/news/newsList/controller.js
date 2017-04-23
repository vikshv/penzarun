export default class NewsListPageController {
    constructor(NewsService) {
        'ngInject';

        this._loadNews(NewsService);
    }

    _loadNews(NewsService) {
        this._startLoadProgress();
        NewsService.loadNews()
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
