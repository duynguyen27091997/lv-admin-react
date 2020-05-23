export const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
export const toDateString = function (time) {
    const date = new Date(time);
    return date.toLocaleString('vi-GB');
}
export const toSeconds = function (value) {
    let times = value.split(":");
    let hrs = parseInt(times[0]);
    let min = parseInt(times[1]);
    let sec = parseInt(times[2]);
    return (hrs * 60 * 60 + min * 60 + sec);
};