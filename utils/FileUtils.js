import { showToast, getAccessToken } from './WebUtils';
import { getErrorMsg } from './StringUtils';
import { isJson } from './Utils';

import { domains } from '@constants/index';

export const downloadFile = (url) => {
    window.open(url, '_blank');
    window.focus();
}

export const downloadUrl = (url, filename) => {
    fetch(url).then((t) => t.blob().then((b) => {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', filename);
        a.click();
        a.remove();
    }));
}

export const downloadXMLFileBuffer = async (url, name) => {
    let payload = await new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        http.open('GET', url);
        http.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
        http.responseType = 'blob';
        http.send();
        http.onload = () => {
            if (http.status >= 200 && http.status < 300) {
                resolve(http.response);
            } else {
                showToast(getErrorMsg('error'), { type: 'error' });
                reject(http.statusText);
            }
        };
        http.onerror = () => {
            showToast(getErrorMsg('error'), { type: 'error' });
            reject(http.statusText)
        };
    });
    let blob = new Blob([payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = name || 'File.xlsx';
    a.click();
    a.remove();
}

export const blobToJSON = async (data) => {
    let res = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function (evt) {
            res = evt.target.result;
            resolve(isJson(res) ? JSON.parse(res) : {});
        };
        reader.readAsText(data);
        reader.onerror = () => { reject(reader.result); };
    })
    return res;
}

export const getFileInfo = (type, name) => {
    let fileType = 'other', fileKind = '';
    if (name?.indexOf('.') > -1) {
        fileKind = name?.split('.').pop();
    }
    if (type) {
        let _type = type.split('/');
        fileType = _type[0];
        if (!fileKind) fileKind = _type[1];
        if (fileKind.indexOf('svg') > -1 || !['image', 'audio', 'video', 'text'].includes(fileType)) {
            fileType = 'other';
        }
    }
    if (!fileKind) fileKind = name;
    return {
        fileType, fileKind,
        isImgFile: fileType === 'image',
        isAudioFile: fileType === 'audio',
    };
}

export const getImageSize = (url) => {
    return new Promise(resolve => {
        let img = new Image(), onFinish = (size = { width: 0, height: 0 }) => { img.remove(); resolve(size); };
        img.onerror = () => onFinish();
        img.onload = () => onFinish({ width: img.width, height: img.height });
        img.src = url;
    })
}

export const getAudioDuration = (url) => {
    return new Promise((resolve) => {
        if (!url) { resolve(0); }
        let audio = new Audio(), onFinish = (duration = 0) => { audio.remove(); resolve(duration); }
        audio.onerror = () => onFinish();
        audio.onloadedmetadata = () => onFinish(audio.duration);
        audio.src = url;
    });
}

export const getVideoInfo = (url) => {
    return new Promise((resolve) => {
        let info = { duration: 0, width: 0, height: 0 };
        if (!url) { resolve(info); }
        let video = document.createElement('video'), onFinish = (_info) => { video.remove(); resolve(_info); }
        video.onerror = () => onFinish(info);
        video.onloadeddata = () => onFinish({ duration: video.duration, width: video.videoWidth, height: video.videoHeight });
        video.src = url;
    });
}

export const exportExcelFile = (file, name) => {
    let blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${name || 'Unknown'}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const fileUrlToBase64 = (url, callback = () => null) => {
    return new Promise(resolve => {
        if (!url) return resolve('');
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            let reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
                resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}

export const getUploadFileUrl = (url = '', fallbackUrl = '') => {
    url = String(url || '');
    if (!url) return fallbackUrl;
    return ['http', 'blob', 'data:', '/_next'].some(i => url.startsWith(i)) ? url : domains.uploadFile + url;
}