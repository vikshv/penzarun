
export default class StartlistServiceController {
    constructor(FirebaseService, $firebaseArray, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();

        this.startlist = firebase.database().ref('startlist');
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    getStartlist(eventId) {
        const ref = this.startlist.child(eventId);
        return this.$firebaseArray(ref);
    }
}
