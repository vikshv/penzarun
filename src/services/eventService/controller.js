export default class EventService {
    constructor($firebaseArray) {
        'ngInject';

        const ref = firebase.database().ref('events');
        this.list = $firebaseArray(ref);
    }

    loadEvents() {
        return this.list.$loaded()
            .then(result => result.map(item => {
                const { title, abstract, description, timestamp } = item;
                return {
                    title, 
                    abstract, 
                    description, 
                    timestamp
                };
            }));
    }

    getEvent(index) {
        const key = this.list.$keyAt(index);
        return this.list.$getRecord(key);
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
