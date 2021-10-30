String.prototype.shuffle = function () {
    let a = this.split(""), n = a.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
String.prototype.capitalize = function (all) {
    let a = this.trim(""), func = function (t) { return t.charAt(0).toUpperCase() + t.slice(1) };
    return all ? a.split(" ").map(func).join(" ") : func(a);
}
String.prototype.toNumeric = function () {
    return this.replace(/[^0-9\,]/g, "");
}
String.prototype.isEmail = function () {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.toLowerCase());
}
String.prototype.isValid = function (isValid) {
    return isValid ? this : '';
}
String.prototype.remove = function (regx) {
    return this.replace(regx, '');
}