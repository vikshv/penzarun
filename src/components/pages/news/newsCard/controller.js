export default class NewsCardPageController {
    constructor($sce, NewsService) {
        'ngInject';

        this.$sce = $sce;

        this._loadNews(NewsService);
    }

    getContentHtml() {
        return this.$sce.trustAsHtml(this.news.content);
    }

    _loadNews(NewsService) {
        this._startLoadProgress();
        NewsService.getNewsById(this.id)
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
};
