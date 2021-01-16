// Order n cubic


const vertices = [
    [1, 1, 1, 1],
    [1, 1, -1, 1],
    [1, -1, -1, 1],
    [1, -1, 1, 1],
    [1, 1, 1, -1],
    [1, 1, -1, -1],
    [1, -1, -1, -1],
    [1, -1, 1, -1]
];


const faces = [
    [0, 3, 2, 1],
    [4, 7, 3, 0],
    [7, 6, 2, 3],
    [7, 4, 5, 6],
    [0, 1, 5, 4],
    [1, 2, 6, 5]
];


function a(v) {

    return [v[0], v[1], v[2], -v[3]];

}


function b(v) {

    return [v[0], v[1], v[3], v[2]];

}


function c(v) {

    return [v[0], v[2], v[1], v[3]];

}


function d(n, v) {

    if (n == 5) {

        return [p * v[0] - v[1] / p, p ** 2 * v[0] - p * v[1], v[2], v[3]];

    } else if (n == 6) {

        return [2 * v[0] - v[1], 3 * v[0] - 2 * v[1], v[2], v[3]];

    } else {

        var cos = Math.cos(2 * Math.PI / n);
        return [(1 + 2 * cos) * v[0] - 2 * cos * v[1], 2 * (1 + cos) * v[0] - (1 + 2 * cos) * v[1], v[2], v[3]];

    }

}

function e(v) {

    return [v[0], v[1], v[2], v[3]];

}

function f(n, v) {

    var newVector = [];

    switch (n) {

        case 5:

            newVector = ORDER5.f(v);
            break;

        case 6:

            newVector = ORDER6.f(v);
            break;

        default:

            var cot = 1 / (Math.tan(Math.PI / n) ** 2);

            var a = Math.sqrt(Math.abs(2 * cot / (3 - cot)));
            var b = Math.sqrt(Math.abs((cot - 1) / (3 - cot)));

            // matrix = [
            //     [Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0],
            //     [0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0, 0],
            //     [0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot))), 0],
            //     [0, 0, 0, Math.sqrt(Math.abs((cot - 1) / (3 - cot)))]
            // ];

            newVector = [a * v[0], b * v[1], b * v[2], b * v[3]];
    }

    return newVector;
}

function matrixDict(n, letter, vector) {
    var newVector;
    switch (letter) {
        case 'a':
            newVector = a(vector);
            break;
        case 'b':
            newVector = b(vector);
            break;
        case 'c':
            newVector = c(vector);
            break;
        case 'd':
            newVector = d(n, vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(n, vector);
            break;
    }
    return newVector;
};

const faceReflections = ['bc', 'c', 'cbabc', 'abc', '', 'babc'];

function center(n) {

    var newCenter = [];

    switch (n) {
        case 5:

            newCenter = ORDER5.center;
            break;

        case 6:

            newCenter = ORDER6.center;
            break;

        default:

            var cot = 1 / (Math.tan(Math.PI / n) ** 2);
            newCenter = [1 / Math.sqrt(Math.abs(2 * cot / (3 - cot))), 0, 0, 0]

    }

    return newCenter;

}

export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };