export default class AuthServiceController {
    constructor($firebaseAuth) {
        'ngInject';

        this.auth = $firebaseAuth();
    }

    waitForSignIn() {
        return this.auth.$waitForSignIn();
    }

    requireSignIn() {
        return this.auth.$requireSignIn();
    }

    getAuth() {
        return this.auth.$getAuth();
    }

    onAuthStateChanged(callback) {
        this.auth.$onAuthStateChanged(callback);
    }

    signInWithEmailAndPassword(email, password) {
        return this.auth.$signInWithEmailAndPassword(email, password);
    }

    signOut() {
        this.auth.$signOut();
    }
}
