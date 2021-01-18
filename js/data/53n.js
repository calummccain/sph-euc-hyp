// Order n dodecahedral

import { p } from "./constants.js";


const vertices = [
    [1, 1, 1, 1],
    [1, 1, 1, -1],
    [1, 1, -1, 1],
    [1, 1, -1, -1],
    [1, -1, 1, 1],
    [1, -1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, -1, -1],
    [1, 0, p, 1 / p],
    [1, 0, p, -1 / p],
    [1, 0, -p, 1 / p],
    [1, 0, -p, -1 / p],
    [1, p, 1 / p, 0],
    [1, p, -1 / p, 0],
    [1, -p, 1 / p, 0],
    [1, -p, -1 / p, 0],
    [1, 1 / p, 0, p],
    [1, -1 / p, 0, p],
    [1, 1 / p, 0, -p],
    [1, -1 / p, 0, -p]
];


const faces = [
    [0, 16, 2, 13, 12],
    [1, 12, 13, 3, 18],
    [0, 12, 1, 9, 8],
    [0, 8, 4, 17, 16],
    [2, 16, 17, 6, 10],
    [1, 18, 19, 5, 9],
    [4, 8, 9, 5, 14],
    [5, 19, 7, 15, 14],
    [6, 17, 4, 14, 15],
    [3, 13, 2, 10, 11],
    [3, 11, 7, 19, 18],
    [11, 10, 6, 15, 7]
];


function a(v) {

    return [v[0], v[1], v[2], -v[3]];

}


function b(v) {

    return [v[0], v[1], -v[2], v[3]];

}


function c(v) {

    return [v[0], (p * v[1] + v[2] + v[3] / p) / 2, (v[1] - v[2] / p - p * v[3]) / 2, (v[1] / p - p * v[2] + v[3]) / 2];

}


//fev
function d(n, v) {

    if (n == 3) {

        return [
            (p * v[0] + v[1] / (p ** 3) + v[3] / (p ** 4)) / 2,
            ((p ** 3) * v[0] - v[1] / p - p * v[3]) / 2,
            v[2],
            ((p ** 2) * v[0] - p * v[1] + v[3]) / 2
        ];

    } else if (n == 4) {

        return [
            p ** 2 * v[0] - v[1] - v[3] / p,
            p ** 3 * v[0] - p * v[1] - p * v[3],
            v[2],
            p ** 2 * v[0] - p * v[1]
        ];

    } else if (n == 5) {

        return [
            ((4 * p + 1) * v[0] - (4 * p - 1) / p * v[1] - (4 * p - 1) / (p ** 2) * v[3]) / 2,
            (p ** 5 * v[0] + (2 - p ** 4) * v[1] - p ** 3 * v[3]) / 2,
            v[2],
            (p ** 4 * v[0] - p ** 3 * v[1] - v[3] / p) / 2
        ];

    } else if (n == 6) {

        return [
            ((2 + p ** 4) * v[0] - p ** 3 * v[1] - p ** 2 * v[3]) / 2,
            (3 * p ** 3 * v[0] + (2 - 3 * p ** 2) * v[1] - 3 * p * v[3]) / 2,
            v[2],
            (3 * p ** 2 * v[0] - 3 * p * v[1] - v[3]) / 2
        ];

    } else {

        var cos = Math.cos(Math.PI / n) ** 2;
        var rt = Math.sqrt(5);

        return [
            (2 * p * rt * cos - 1) * v[0] - (2 * rt * cos - 2 / p) * v[1] - (2 * rt * cos / p - 2 / (p ** 2)) * v[3],
            2 * (p ** 3) * cos * v[0] + (1 - 2 * (p ** 2) * cos) * v[1] - 2 * p * cos * v[3],
            v[2],
            2 * (p ** 2) * cos * v[0] - 2 * p * cos * v[1] + (1 - 2 * cos) * v[3]
        ];

    }

}


function e(v) {

    return [v[0], v[1], v[2], v[3]];

}


function f(n, v) {

    if (n == 3) {

        return [
            (p ** 2) * v[0] / Math.sqrt(8),
            v[1] / (p * Math.sqrt(8)),
            v[2] / (p * Math.sqrt(8)),
            v[3] / (p * Math.sqrt(8))
        ];

    } else if (n == 4) {

        return [
            p ** 2 / Math.sqrt(2) * v[0],
            Math.sqrt(p / 2) * v[1],
            Math.sqrt(p / 2) * v[2],
            Math.sqrt(p / 2) * v[3]
        ];

    } else if (n == 5) {

        return [
            (p ** 4) / 2 * v[0],
            p * Math.sqrt(4 * p - 1) / 2 * v[1],
            p * Math.sqrt(4 * p - 1) / 2 * v[2],
            p * Math.sqrt(4 * p - 1) / 2 * v[3]
        ];


    } else if (n == 6) {

        return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);

        return [
            (p ** 2) * Math.sqrt(cot / (cot - 3)) * v[0],
            Math.sqrt(((p ** 2) * cot - 1) / (cot - 3)) * v[1],
            Math.sqrt(((p ** 2) * cot - 1) / (cot - 3)) * v[2],
            Math.sqrt(((p ** 2) * cot - 1) / (cot - 3)) * v[3]
        ];

    }

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

}


const faceReflections = ['', 'a', 'ca', 'babacbca', 'abacbca', 'acbca', 'cbacbca', 'acbcbacbca', 'cbcbacbca', 'bca', 'bacbca', 'bcbacbca'];


function center(n) {

    if (n == 3) {

        return [Math.sqrt(8) / (p ** 2), 0, 0, 0];

    } else if (n == 4) {

        return [Math.sqrt(2) / (p ** 2), 0, 0, 0];

    } else if (n == 5) {

        return [2 / (p ** 4), 0, 0, 0];


    } else if (n == 6) {

        return [1 / Math.sqrt(3), 0, 0, 0];

    } else {

        var cot = 1 / (Math.tan(Math.PI / n) ** 2);
        return [1 / ((p ** 2) * Math.sqrt(Math.abs(cot / (3 - cot)))), 0, 0, 0];

    }

}


export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };