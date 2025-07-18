const KEY = 'database'
export function readItems() {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
}
export function writeItems(list) {
    localStorage.setItem(KEY, JSON.stringify(list))
}
export function findItem(uid) {
    return readItems().find(i => i.uid == uid)
}