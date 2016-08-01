export default class EventCardPageController {
    constructor($state, EventService, FileStorageService, StartlistService, VKService) {
        'ngInject';

        this.$state = $state;
        this.EventService = EventService;
        this.FileStorageService = FileStorageService;
        this.StartlistService = StartlistService;
        this.VKService = VKService;
        
        this._initEvent();
    }

    _initVKComments(VKService) {
        const id = this.event.id
        const href = this.$state.href('events.card', { id });

        this.VKService.initWidgetsComments({
            elementId: 'vk_comments',
            pageUrl: `http://penzarun.ru/${href}`,
            pageId: `event-${id}`
        })
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(event => {
                    this.event = event;
                    return event;
                })
                .then(event => {
                    return Promise.all([
                        this._initProvisionFile(event),
                        this._initProtocolFile(event),
                    ]);
                })
                .then(() => {
                    return this.StartlistService.getStartlist(this.event.id);
                })
                .then(startlist => {
                    this.startlistLength = startlist.length;
                    this._initVKComments();
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

    _initProvisionFile(event) {
        const { id, isProvisionFile } = event;
        let result;
        if (isProvisionFile) {
            result = Promise.all([
                    this.FileStorageService.getProvisionFileUrl(id),
                    this.FileStorageService.getProvisionFileSize(id)
                ])
                .then(result => {
                    this.provisionFileUrl = result[0];
                    this.provisionFileSize = result[1];
                });
        } else {
            result = Promise.resolve();
        }
        return result;
    }

    _initProtocolFile(event) {
        const { id, isProtocolFile } = event;
        let result;
        if (isProtocolFile) {
            result = Promise.all([
                this.FileStorageService.getProtocolFileUrl(id),
                this.FileStorageService.getProtocolFileSize(id)
            ])
            .then(result => {
                this.protocolFileUrl = result[0];
                this.protocolFileSize = result[1];
            });
        } else {
            result = Promise.resolve();
        }
        return result;
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
