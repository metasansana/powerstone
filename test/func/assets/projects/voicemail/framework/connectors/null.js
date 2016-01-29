export default function null_connector(options, success, error) {
    global.connected = true;
    success(null);
}
