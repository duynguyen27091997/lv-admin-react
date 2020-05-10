export const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
export const toDateString = function (time) {
    const date = new Date(time);
    return date.toLocaleString('vi-GB');
}