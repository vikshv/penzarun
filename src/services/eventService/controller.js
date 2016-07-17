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
        return list.$loaded();
    }

    _getRefByOptions({ dateBegin, dateEnd }) {
        let result;
        if (dateBegin && dateEnd) {
            result = this.ref.startAt(dateBegin).endAt(dateEnd);
        } else {
            result = this.ref;
        }
        return result;
    }

    getNearEvent(date) {
        const ref = this.ref.startAt(date).limitToFirst(1);
        const list = this.$firebaseArray(ref);
        return list.$loaded()
            .then(result => {
                return this._mapEvent(result[0]);
            });
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
            masterEmail
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
            masterEmail
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
        Object.assign(obj, data, {
            editTimestamp: Date.now()
        });
        return obj.$save()
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
