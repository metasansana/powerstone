export default function string(key, value, line) {
    return line.next(null, key, String(value));
}
