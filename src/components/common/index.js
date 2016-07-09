import angular from 'angular';

import navbar from './navbar';
import footer from './footer';
import eventsList from './eventsList';
import progressBar from './progressBar';
import uploadFileButton from './uploadFileButton';

export default angular.module('app.components.common', [
    navbar.name,
    footer.name,
    eventsList.name,
    progressBar.name,
    uploadFileButton.name
]);
