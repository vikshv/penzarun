export default class EventService {
    constructor(FirebaseService, $firebaseArray, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        this.ref = firebase.database().ref('events').orderByChild('date');

        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    loadEvents(options) {
        const ref = options ? this._getRefByOptions(options) : this.ref;
        const list = this.$firebaseArray(ref);
        return list.$loaded()
            .then(result => {
                return result.map(event => this._mapEvent(event));
            });
    }

    _getRefByOptions({ dateBegin, dateEnd, limitToFirst }) {
        let result = this.ref;
        if (dateBegin) {
            result = result.startAt(dateBegin);
        }
        if (dateEnd) {
            result = result.endAt(dateEnd);
        }
        if (limitToFirst) {
            result = result.limitToFirst(limitToFirst);
        }
        return result;
    }

    _mapEvent(event) {
        const { 
            $id, 
            date,
            time,
            title, 
            abstract, 
            description, 
            tag = 'event', 
            place, 
            distances,
            master,
            masterUrl,
            masterPerson,
            masterPhone,
            masterEmail,
            isProvisionFile,
            isProtocolFile
        } = event;

        return {
            id: $id,
            date,
            time,
            title,
            abstract,
            description,
            tag,
            date: new Date(date),
            place,
            distances,
            master,
            masterUrl,
            masterPerson,
            masterPhone,
            masterEmail,
            isProvisionFile,
            isProtocolFile
        };
    }

    getEvent(key) {
        const obj = this._getEventObj(key);
        return obj.$loaded()
            .then(result => {
                return this._mapEvent(result);
            });
    }

    getDefaultEvent() {
        return {
            tag: 'event',
            time: '11:00'
        };
    }

    saveEvent(key, data) {
        const obj = this._getEventObj(key);
        return obj.$loaded()
            .then(result => {
                Object.assign(result, data, {
                    editTimestamp: Date.now()
                });
                return obj.$save();
            })
            .then(ref => {
                return ref.key;
            });
    }

    addEvent(data) {
        const list = this.$firebaseArray(this.ref);
        return list.$add({
                ...data,
                createTimestamp: Date.now()
            })
            .then(ref => {
                return ref.key;
            });
    }

    removeEvent(key) {
        const obj = this._getEventObj(key);
        return obj.$remove();
    }

    _getEventObj(key) {
        const ref = firebase.database().ref(`events/${key}`);
        return this.$firebaseObject(ref);
    }
};
