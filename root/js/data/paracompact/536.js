// order 6 dodecahedral (paracompact)

import { p } from "./constants.js";

const vertices = [
    [[1, 1, 1, 1]],
    [[1, 1, 1, -1]],
    [[1, 1, -1, 1]],
    [[1, 1, -1, -1]],
    [[1, -1, 1, 1]],
    [[1, -1, 1, -1]],
    [[1, -1, -1, 1]],
    [[1, -1, -1, -1]],
    [[1, 0, p, 1 / p]],
    [[1, 0, p, -1 / p]],
    [[1, 0, -p, 1 / p]],
    [[1, 0, -p, -1 / p]],
    [[1, p, 1 / p, 0]],
    [[1, p, -1 / p, 0]],
    [[1, -p, 1 / p, 0]],
    [[1, -p, -1 / p, 0]],
    [[1, 1 / p, 0, p]],
    [[1, -1 / p, 0, p]],
    [[1, 1 / p, 0, -p]],
    [[1, -1 / p, 0, -p]]
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

//cev
const a = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, -1]
];


//cfe
const b = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 1]
];

// //cfv
// const c = [
//     [1, 0, 0, 0],
//     [0, 1 - 2 / (4 * p ** 2), 1 / 2, 1 / (2 * p)],
//     [0, 1 / 2, 1 - 2 * p ** 4 / (4 * p ** 2), -p / 2],
//     [0, 1 / (2 * p), -p / 2, 1 - 2 * p ** 2 / (4 * p ** 2)]
// ];

//cfv
const c = [
    [1, 0, 0, 0],
    [0, p / 2, 1 / 2, 1 / (2 * p)],
    [0, 1 / 2, -1 / (2 * p), -p / 2],
    [0, 1 / (2 * p), -p / 2, p / 2]
];

//fev
const d = [
    [1 + p ** 4 / 2, -(p ** 3) / 2, 0, -(p ** 2) / 2],
    [3 * p ** 3 / 2, 1 - 3 * p ** 2 / 2, 0, -3 * p / 2],
    [0, 0, 1, 0],
    [3 * p ** 2 / 2, -3 * p / 2, 0, -1 / 2]
];

const e = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const f = [
    [Math.sqrt(3), 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const matrixDict = {
    'a': a,
    'b': b,
    'c': c,
    'd': d,
    'e': e,
    'f': f
};

export { vertices, faces, a, b, c, d, e, f, matrixDict };