export default class NewsCardPageController {
    constructor($sce, $state, NewsService) {
        'ngInject';

        this.$sce = $sce;
        this.$state = $state;

        this._initVKComments();
        this._loadNews(NewsService);
    }

    _initVKComments() {
        const { id } = this;
        const href = this.$state.href('news.card', { id });
        const pageUrl = `http://penzarun.ru/${href}`;

        window.VK.Widgets.Comments('vk_comments', {
            redesign: 1,
            limit: 10,
            attach: '*',
            pageUrl
        }, `news-${id}`);
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
}
