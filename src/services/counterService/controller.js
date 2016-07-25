export default class CounterService {
    constructor(FirebaseService, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        const ref = firebase.database().ref('visitors');
        this.$obj = $firebaseObject(ref);
    }

    getVisitors() {
        if (!this.visitors) {
            this.visitors = this._initVisitors();
        }
        return this.visitors;
    }

    _initVisitors() {
        let visitors;
        return this.$obj.$loaded()
            .then(result => {
                let { value } = result;
                isFinite(value) || (value = 0);
                visitors = result.value = value + 1;
                return this.$obj.$save();
            })
            .then(() => {
                return visitors;
            });
    }
}
