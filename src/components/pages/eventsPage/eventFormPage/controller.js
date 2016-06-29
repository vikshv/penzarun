export default class EventFormPageController {
    constructor($scope, $state, EventService) {
        'ngInject';
        
        this.$scope = $scope;
        this.$state = $state;
        this.EventService = EventService;
        
        this._initEvent();

        this.dateFormat = 'EEEE, dd MMMM yyyy';
        this.datePopupIsOpen = false;
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(result => {
                    const { $id, date, title, abstract, description, tag = 'event' } = result;
                    this.event = {
                        $id,
                        date,
                        title,
                        abstract,
                        description,
                        tag,
                        date: new Date(date)
                    };
                    this._stopLoadProgress();
                })
                .catch(error => {
                    this._stopLoadProgress();
                    throw Error(error);
                });
        } else {
            this.event = {
                tag: 'event'
            };
        }
    }

    isHasError(attrName) {
        const item = this.$scope.event[attrName];
        return item.$invalid && item.$dirty && item.$touched;
    }

    openDatePopup() {
        this.datePopupIsOpen = true;
    }

    submit() {
        const { date, title, abstract = '', description = '', tag } = this.event;

        this._startSaveProgress();
        this._saveEvent({
                date: date.getTime(),
                title,
                abstract,
                description,
                tag
            })
            .then(() => {
                this._gotoEventList();
            })
            .catch(error => {
                this._stopSaveProgress();
                throw Error(error);
            });
    }

    onClickRemoveButton() {
        // TODO: edd confirm dialog
        this._removeEvent();
    }

    _saveEvent(data) {
        let result;
        if (this.id) {
            result = this.EventService.saveEvent(this.id, data);
        } else {
            result = this.EventService.addEvent(data);
        }
        return result;
    }

    _removeEvent() {
        this._startRemoveProgress();
        this.EventService.removeEvent(this.id)
            .then(() => {
                this._gotoEventList();
            })
            .catch(error => {
                this._stopRemoveProgress();
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
        this.saveProgress = this.disabledForm = true;
    }

    _stopSaveProgress() {
        this.saveProgress = this.disabledForm = false;
    }

    _startRemoveProgress() {
        this.removeProgress = this.disabledForm = true;
    }

    _stopRemoveProgress() {
        this.removeProgress = this.disabledForm = false;
    }

    _gotoEventList() {
        this.$state.go('events.list');
    }
};
