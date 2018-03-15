var width = undefined;
var height = undefined;
window.onload = function () {
    width = window.innerWidth - 20;
    height = window.innerHeight - 20;
    var canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    var gl = canvas.getContext('webgl');
    window.requestAnimationFrame(animate(gl));
};
var start = undefined;
var before = undefined;
var animate = function (gl) { return function (timestamp) {
    if (!start) {
        start = timestamp;
    }
    if (!before) {
        before = timestamp;
    }
    var total = timestamp - start;
    var progress = timestamp - before;
    before = timestamp;
    render(gl, total, progress);
    window.requestAnimationFrame(animate(gl));
}; };
var render = function (gl, total, progress) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};
//# sourceMappingURL=main.js.map