export default class EventPageController {
    constructor($q, $scope, $state, EventService) {
        'ngInject';

        this.$q = $q;
        this.$scope = $scope;
        this.$state = $state;
        this.EventService = EventService;
        
        this._initEvent();
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(result => {
                    this.event = result;
                    this._stopLoadProgress();
                })
                .catch(error => {
                    this._stopLoadProgress();
                    throw Error(error);
                });
        } else {
            this.event = {};
        }
    }

    isHasError(attrName) {
        const item = this.$scope.event[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    submit() {
        const { title, abstract = '', description = '' } = this.event;

        this._startSaveProgress();
        this.EventService.addEvent({
                title,
                abstract,
                description
            })
            .then(id => {
                this._gotoEventState(id);
            })
            .catch(error => {
                this._stopSaveProgress();
                throw Error(error);
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }

    _startSaveProgress() {
        this.saveProgress = true;
    }

    _stopSaveProgress() {
        this.saveProgress = false;
    }

    _gotoEventState(id) {
        this.$state.go('events.edit', { id });
    }
};
