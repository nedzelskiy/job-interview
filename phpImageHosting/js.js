'use strict';

var App = {};

App.htmlSaveMeta = document.querySelector('.saveMeta');
App.htmlDeleteFile = document.querySelector('.deleteFile');
App.htmlThumbsMeta = document.querySelector('.thumbsMeta');
App.htmlThumbsMetaTitle = document.querySelector('.meta_title');
App.htmlUploadedStatus = document.querySelector('.uploadedStatus');
App.htmlCloseThumbsMeta = document.querySelector('.closeThumbsMeta');
App.htmlLastUploadedList = document.querySelector('.lastUploadedList');
App.htmThumbsMetaUploaded = document.querySelector('.thumbsMetaUploaded');
App.htmlLastUploadedStatus = document.querySelector('.lastUploadedStatus');
App.htmlThumbsMetaFileName = document.querySelector('.thumbsMetaFileName');
App.htmlThumbsMetaDescription = document.querySelector('.meta_description');

App.uploadHandler = function() {
    App.checkThumbs();
    var responseText = 'Processing...';
    try {
        var response = JSON.parse(this.responseText);
        if(this.status == 200) {
            responseText = 'Done';
        } else {
            responseText = 'Error';
            if (response && response.error && response.message) {
                responseText = responseText + "<br />" + response.message;
            }
        }
        if (response && response.data) {
            response.data.forEach(function(obj) {
                for (var key in obj) {
                    responseText = responseText + "<br />" + key + ': ' + obj[key];
                }
            });
        }
        App.htmlUploadedStatus.innerHTML = responseText;
    } catch (err) {
        App.htmlUploadedStatus.innerHTML = 'Error' + '<br />' + err.toString();
    }
};

App.upload = function() {
    try {
        App.htmlUploadedStatus.innerHTML = '';
        App.uploadXhr = new XMLHttpRequest();
        App.uploadXhr.open('POST', 'upload.php');
        App.uploadXhr.onload = App.uploadHandler;
        App.formData = new FormData(document.forms[0]);
        App.uploadXhr.send(App.formData);
        App.htmlUploadedStatus.innerHTML = 'Processing...';
    } catch (err) {
        App.htmlUploadedStatus.innerHTML = 'Error';
        console.error(err);
    }
    return false;
};

App.thumbsHandler = function() {
    var responseText = 'Processing...';
    try {
        var response = JSON.parse(this.responseText);
        if(this.status == 200) {
            if (response && response.data) {
                if (!response.data.isQueueReady) {
                    setTimeout(App.checkThumbs, 1000);
                } else {
                    responseText = 'Received';
                }
            }
        } else {
            responseText = 'Error';
            if (response && response.error && response.message) {
                responseText = responseText + "<br />" + response.message;
            }
        }
        if (response && response.data && response.data.thumbsUrls) {
            App.htmlLastUploadedList.innerHTML = '';
            response.data.thumbsUrls.forEach(function(imageName) {
                var img = document.createElement('img');
                var div = document.createElement('div');
                var li = document.createElement('li');
                img.src = response.data.thumbsDir + '/' + imageName;
                img.onclick = App.getMetadata.bind(img, imageName);
                div.innerHTML = imageName;
                li.appendChild(img);
                li.appendChild(div);
                App.htmlLastUploadedList.appendChild(li);
            });
        } else {
            responseText = 'There are no files uploaded yet';
        }
        App.htmlLastUploadedStatus.innerHTML = responseText;
    } catch (err) {
        App.htmlLastUploadedStatus.innerHTML = 'Error' + '<br />' + err.toString();
    }
};

App.checkThumbs = function() {
    App.htmlLastUploadedStatus.innerHTML = '';
    App.htmlThumbsMeta.style.display = 'none';
    App.thumbsXhr = new XMLHttpRequest();
    App.thumbsXhr.open('POST', 'check_thumbs.php');
    App.thumbsXhr.onload = App.thumbsHandler;
    App.thumbsXhr.send();
    App.htmlLastUploadedStatus.innerHTML = 'Processing...';
};

App.getMetadataHandler = function() {
    App.htmlThumbsMetaTitle.value = '';
    App.htmlThumbsMetaDescription.value = '';
    App.htmlThumbsMetaFileName.innerHTML = '';
    App.htmlDeleteFile.setAttribute('data-id', '');
    App.htmlSaveMeta.setAttribute('data-id', '');
    try {
        var response = JSON.parse(this.responseText);
        if(this.status == 200 && response.data) {
            App.htmlDeleteFile.setAttribute('data-id', response.data.id);
            App.htmlSaveMeta.setAttribute('data-id', response.data.id);
            App.htmlThumbsMetaFileName.innerHTML = response.data.fileName;
            if (response.data['meta_title']) {
                App.htmlThumbsMetaTitle.value = response.data['meta_title'];
            }
            if (response.data['meta_description']) {
                App.htmlThumbsMetaDescription.value = response.data['meta_description'];
            }
            App.htmThumbsMetaUploaded.innerHTML = 'Received';
        } else {
            var responseText = 'Error';
            if (response && response.error && response.message) {
                responseText = responseText + "<br />" + response.message;
            }
            App.htmThumbsMetaUploaded.innerHTML = responseText;

        }
    } catch (err) {
        App.htmThumbsMetaUploaded.innerHTML = 'Error';
        App.htmlThumbsMetaTitle.value = '';
        App.htmlThumbsMetaDescription.value = '';
    }
    App.htmlThumbsMeta.style.display = 'inline-block';
};

App.deleteImgHandler = function() {
    if(this.status == 200) {
        App.htmlThumbsMeta.style.display = 'none';
        App.checkThumbs();
    }
};

App.getMetadata = function(id) {
    App.htmThumbsMetaUploaded.innerHTML = '';
    App.getMetadataXhr = new XMLHttpRequest();
    App.getMetadataXhr.open('POST', 'get_metadata.php');
    App.getMetadataXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var body = 'id=' + encodeURIComponent(id);
    App.getMetadataXhr.onload = App.getMetadataHandler;
    App.getMetadataXhr.send(body);
    App.htmThumbsMetaUploaded.innerHTML = 'Processing...';
};

App.deleteImg = function(id) {
    App.deleteImgXhr = new XMLHttpRequest();
    App.deleteImgXhr.open('POST', 'deleteImg.php');
    App.deleteImgXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var body = 'id=' + encodeURIComponent(id);
    App.deleteImgXhr.onload = App.deleteImgHandler;
    App.deleteImgXhr.send(body);
};

App.htmlCloseThumbsMeta.onclick = function() {
    App.htmlThumbsMeta.style.display = 'none';
};

App.htmlDeleteFile.onclick = function() {
    App.deleteImg(App.htmlDeleteFile.getAttribute('data-id'));
};

App.htmlSaveMetaImgHandler = function() {
    if(this.status == 200) {
        alert('Metadata saved!');
    }
};

App.htmlSaveMeta.onclick = function() {
    App.htmlSaveMetaImgXhr = new XMLHttpRequest();
    App.htmlSaveMetaImgXhr.open('POST', 'set_metadata.php');
    App.htmlSaveMetaImgXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var body = 'id=' + encodeURIComponent(App.htmlSaveMeta.getAttribute('data-id'))
        + '&meta_title=' + encodeURIComponent(App.htmlThumbsMetaTitle.value)
        + '&meta_description=' + encodeURIComponent(App.htmlThumbsMetaDescription.value);
    App.htmlSaveMetaImgXhr.onload = App.htmlSaveMetaImgHandler;
    App.htmlSaveMetaImgXhr.send(body);
};

App.checkThumbs();