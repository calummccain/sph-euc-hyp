// order n icosahedral

import { p } from "../constants.js";

const vertices = [
    [1, 1, p, 0],
    [1, 1, -p, 0],
    [1, -1, p, 0],
    [1, -1, -p, 0],
    [1, p, 0, 1],
    [1, -p, 0, 1],
    [1, p, 0, -1],
    [1, -p, 0, -1],
    [1, 0, 1, p],
    [1, 0, 1, -p],
    [1, 0, -1, p],
    [1, 0, -1, -p]
]

const faces = [
    [0, 8, 2],
    [0, 2, 9],
    [0, 6, 4],
    [0, 4, 8],
    [0, 9, 6],
    [1, 3, 10],
    [1, 11, 3],
    [1, 4, 6],
    [1, 10, 4],
    [1, 6, 11],
    [2, 5, 7],
    [2, 8, 5],
    [2, 7, 9],
    [3, 7, 5],
    [3, 5, 10],
    [3, 11, 7],
    [4, 10, 8],
    [5, 8, 10],
    [6, 9, 11],
    [7, 11, 9]
];

// const a = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, -1]
// ];

function a(v) {
    return [v[0], v[1], v[2], -v[3]];
}

// const b = [
//     [1, 0, 0, 0],
//     [0, -1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function b(v) {
    return [v[0], -v[1], v[2], v[3]];
}

// const c = [
//     [1, 0, 0, 0],
//     [0, 1 / 2, 1 / (2 * p), -p / 2],
//     [0, 1 / (2 * p), p / 2, 1 / 2],
//     [0, -p / 2, 1 / 2, -1 / (2 * p)]
// ];

function c(v) {
    return [v[0], (v[1] + v[2] / p - p * v[3]) / 2, (v[1] / p + p * v[2] + v[3]) / 2, (-p * v[1] + v[2] - v[3] / p) / 2];
}

// const d = [
//     [((p ** 4) - 1) / 2, 0, -((p ** 4) - 3) / (2 * p), -((p ** 4) - 3) / (2 * (p ** 3))],
//     [0, 1, 0, 0],
//     [(p ** 5) / 2, 0, 1 - (p ** 4) / 2, -(p ** 2) / 2],
//     [(p ** 3) / 2, 0, -(p ** 2) / 2, 1 / 2]
// ];

function d(n, v) {
    return [
        ((p ** 4 - 1) * v[0] - ((p ** 4) - 3) / p * v[2] - ((p ** 4) - 3) / (p ** 3) * v[3]) / 2,
        v[1],
        ((p ** 5) * v[0] + (2 - (p ** 4)) * v[2] - p ** 2 * v[3]) / 2,
        ((p ** 3) * v[0] - (p ** 2 )* v[2] + v[3]) / 2
    ];
}

// const e = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];


function e(v) {
    return [v[0], v[1], v[2], v[3]];
}

// const f = [
//     [(p ** 3) / 2, 0, 0, 0],
//     [0, Math.sqrt(3 * p - 1) / 2, 0, 0],
//     [0, 0, Math.sqrt(3 * p - 1) / 2, 0],
//     [0, 0, 0, Math.sqrt(3 * p - 1) / 2]
// ];


function f(v) {
    return [
        (p ** 3) / 2 * v[0],
        Math.sqrt(3 * p - 1) / 2 * v[1],
        Math.sqrt(3 * p - 1) / 2 * v[2],
        Math.sqrt(3 * p - 1) / 2 * v[3]
    ];
}

function matrixDict(letter, vector) {
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
            newVector = d(vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(vector);
            break;
    }
    return newVector;
};

const l = Math.acosh((p ** 6 - (-1 + p ** 2) * (3 * p - 1)) / 4);

// const faceReflections = [
//     '',
//     'a',
//     'ca',
//     'aca', 'bca',
//     'baca', 'caca',
//     'cbaca', 'bcaca',
//     'bcbaca',
//     'abcbaca',
//     'babcbaca', 'cabcbaca',
//     'cbabcbaca', 'acabcbaca', 'bcabcbaca',
//     'bcbabcbaca', 'bacabcbaca',
//     'cbacabcbaca',
//     'acbacabcbaca'
// ];

const faceReflections = [
    '',
    'a',
    'caca',
    'ca',
    'aca',
    'cbacabcbaca',
    'acbacabcbaca',
    'cbabcbaca',
    'cabcbaca',
    'acabcbaca',
    'bcaca',
    'bca',
    'baca',
    'bcbabcbaca',
    'bcabcbaca',
    'bacabcbaca',
    'cbaca',
    'bcbaca',
    'babcbaca',
    'abcbaca'
];

const center = [2 / (p ** 3), 0, 0, 0];

export { typeOfHoneycomb, faceType, vertices, faces, a, b, c, d, e, f, matrixDict, l, faceReflections, center };