export default class EventFormPageController {
    constructor($scope, $state, EventService, ProvisionFileService) {
        'ngInject';
        
        this.$scope = $scope;
        this.$state = $state;
        this.EventService = EventService;
        this.ProvisionFileService = ProvisionFileService;
        
        this._initEvent();

        this.dateFormat = 'EEEE, dd MMMM yyyy';
        this.datePopupIsOpen = false;

        this._initCkeditorOptions();
    }

    _initCkeditorOptions() {
        this.ckeditorOptions = {
            language: 'ru',
            allowedContent: true,
            entities: false,
            height: 300
        };
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(event => {
                    this.event = event;
                    return event.id;
                })
                .then(id => {
                    return this.ProvisionFileService.isFileExist(id, 'Положение');
                })
                .then(() => {
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
            master
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
            master
        })
        .then(id => {
            if (this.provisionFile) {
                return this.ProvisionFileService.upload({
                    key: id,
                    file: this.provisionFile, 
                    fileName: 'Положение'
                });
            }
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

    removeProvision() {
        debugger;
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

    _gotoEventList() {
        this.$state.go('events.list');
    }

    _setReadOnlyCKEDITOR(val) {
        CKEDITOR.instances.eventDescription.setReadOnly(val);
    }
};
