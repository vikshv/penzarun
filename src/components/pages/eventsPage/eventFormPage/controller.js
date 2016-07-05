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
                .then(event => {
                    this.event = event;
                    this._stopLoadProgress();
                })
                .catch(error => {
                    this._stopLoadProgress();
                    throw Error(error);
                });
        } else {
            this.event = this.EventService.getDefaultEvent();
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
        const { 
            date,
            time,
            title, 
            abstract = '', 
            description = '', 
            tag, 
            place = 'г. Пенза, Олимпийская аллея',
            distances = '',
            master,
            message
        } = this.event;

        this._startSaveProgress();
        this._saveEvent({
                date: date.getTime(),
                time,
                title,
                abstract,
                description,
                tag,
                place,
                distances,
                master,
                message
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

    onClickCancelButton() {
        this._gotoEventList();
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
