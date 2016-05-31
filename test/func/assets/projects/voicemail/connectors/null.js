import Promise from 'bluebird';

export default function null_connector(options) {
    global.connected = true;
    return new Promise(function(r) {
        r(null);
    });
}
