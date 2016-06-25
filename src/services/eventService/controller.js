export default class EventService {
    constructor($firebaseArray, $firebaseObject) {
        'ngInject';

        const ref = firebase.database().ref('events');
        this.list = $firebaseArray(ref);

        this.$firebaseObject = $firebaseObject;
    }

    loadEvents() {
        return this.list.$loaded();
    }

    getEvent(key) {
        const ref = firebase.database().ref(`events/${key}`);
        const obj = this.$firebaseObject(ref);
        return obj.$loaded();
    }

    addEvent(data) {
        const timestamp = Date.now();
        return this.list.$add({
                ...data,
                timestamp
            })
            .then(ref => {
                return this.list.$indexFor(ref.key);
            });
    }
};
