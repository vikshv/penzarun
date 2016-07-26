export default class EventFormPageController {
    constructor($scope, $state, EventService, FileStorageService) {
        'ngInject';
        
        this.$scope = $scope;
        this.$state = $state;
        this.EventService = EventService;
        this.FileStorageService = FileStorageService;
        
        this._initEvent();

        this.dateFormat = 'EEEE, d MMMM yyyy';
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
                .then(eventId => {
                    return Promise.all([
                        this.FileStorageService.getProvisionFileName(eventId),
                        this.FileStorageService.getProtocolFileName(eventId)
                    ]);
                })
                .then(results => {
                    this.provisionFile = {
                        name: results[0]
                    };
                    this.protocolFile = {
                        name: results[1]
                    };
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
            master = '',
            masterUrl = '',
            masterPerson = '',
            masterPhone = '',
            masterEmail = ''
        } = this.event;

        this._startSaveProgress();

        const options = {
            date: date.getTime(),
            time,
            title,
            abstract,
            description,
            tag,
            place,
            distances,
            master,
            masterUrl,
            masterPerson,
            masterPhone,
            masterEmail
        };

        this._saveEvent(options)
            .then(id => {
                return Promise.all([
                    this._updateProvisionFile(id),
                    this._updateProtocolFile(id)
                ]);
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
        this.provisionFile = null;
    }

    removeProtocol() {
        this.protocolFile = null;
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

    _updateProvisionFile(eventId) {
        let result;
        if (this.provisionFile) {
            if (this.provisionFile.size) {
                result = this.FileStorageService.uploadProvisionFile(eventId, this.provisionFile);
            } else {
                result = Promise.resolve();
            }
        } else {
            result = this.FileStorageService.deleteProvisionFile(eventId);
        }
        return result;
    }

    _updateProtocolFile(eventId) {
        let result;
        if (this.protocolFile) {
            if (this.protocolFile.size) {
                result = this.FileStorageService.uploadProtocolFile(eventId, this.protocolFile);
            } else {
                result = Promise.resolve();
            }
        } else {
            result = this.FileStorageService.deleteProtocolFile(eventId);
        }
        return result;
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
