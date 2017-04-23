export default class NewsFormPageController {
    constructor($q, $scope, $state, NewsService) {
        'ngInject';

        this.$q = $q;
        this.$scope = $scope;
        this.$state = $state;
        this.NewsService = NewsService;

        this._initNews();
        this.ckeditorOptions = this._initCkeditorOptions();
    }

    _initCkeditorOptions() {
        return {
            language: 'ru',
            allowedContent: true,
            entities: false,
            height: 300
        };
    }

    _initNews() {
        return this.$q.resolve(this.id)
            .then(id => {
                let result;
                if (id) {
                    this._startLoadProgress();
                    result = this.NewsService.getNewsById(id);
                } else {
                    result = {};
                }
                return result;
            })
            .then(result => {
                this._stopLoadProgress();
                this.news = result;
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

    isHasError(attrName) {
        const item = this.$scope.news[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    submit() {
        const { title, abstract = '', content = '' } = this.news;

        this._startSaveProgress();
        
        this._saveNews({
                title,
                abstract,
                content
            })
            .then(id => {
                this._gotoNews(id);
            })
            .catch(error => {
                this._stopSaveProgress();
                throw Error(error);
            });
    }

    onClickRemoveButton() {
        // TODO: edd confirm dialog
        this._removeNews();
    }

    onClickCancelButton() {
        this._gotoNewsList();
    }

    _saveNews(data) {
        return this.$q.resolve(this.id)
            .then(id => {
                let result;
                if (id) {
                    result = this.NewsService.saveNews(id, data);
                } else {
                    result = this.NewsService.addNews(data);
                }
                return result;
            });
    }

    _removeNews() {
        this._startRemoveProgress();
        this.NewsService.removeNews(this.id)
            .then(() => {
                this._gotoNewsList();
            })
            .catch(error => {
                this._stopRemoveProgress();
                throw Error(error);
            });
    }

    _startSaveProgress() {
        this.saveProgress = this.disabledForm = true;
        this._setReadOnlyCKEDITOR(this.disabledForm);
    }

    _stopSaveProgress() {
        this.saveProgress = this.disabledForm = false;
        this._setReadOnlyCKEDITOR(this.disabledForm);
    }

    _startRemoveProgress() {
        this.removeProgress = this.disabledForm = true;
        this._setReadOnlyCKEDITOR(this.disabledForm);
    }

    _stopRemoveProgress() {
        this.removeProgress = this.disabledForm = false;
        this._setReadOnlyCKEDITOR(this.disabledForm);
    }

    _setReadOnlyCKEDITOR(val) {
        window.CKEDITOR.instances.newsContent.setReadOnly(val);
    }

    _gotoNews(id) {
        this.$state.go('news.card', { id });
    }

    _gotoNewsList() {
        this.$state.go('news.list');
    }
}
