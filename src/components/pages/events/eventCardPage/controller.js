export default class EventCardPageController {
    constructor(EventService, FileStorageService, StartlistService) {
        'ngInject';
        
        this.EventService = EventService;
        this.FileStorageService = FileStorageService;
        this.StartlistService = StartlistService;
        
        this._initEvent();
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
                    return this._initProvisionFile(eventId); 
                })
                .then(() => {
                    return this.StartlistService.getStartlist(this.event.id);
                })
                .then(startlist => {
                    this.startlistLength = startlist.length;
                })
                .then(() => {
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

    _initProvisionFile(eventId) {
        return Promise.all([
            this.FileStorageService.getProvisionFileUrl(eventId),
            this.FileStorageService.getProvisionFileSize(eventId)
        ])
        .then(result => {
            this.provisionFileUrl = result[0];
            this.provisionFileSize = result[1];
        });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
