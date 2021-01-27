//returns sum of two vectors
function vectorSum(x, y) {

    var vSum = [];

    for (var i = 0; i < x.length; i++) {

        vSum.push(x[i] + y[i]);

    }

    return vSum;

}

function vectorDiff(x, y) {

    var vDiff = [];

    for (var i = 0; i < x.length; i++) {

        vDiff.push(x[i] - y[i]);

    }

    return vDiff;

}

// scales a vector by 's'
function vectorScale(x, s) {

    var vScale = [];

    for (var i = 0; i < x.length; i++) {

        vScale.push(x[i] * s);

    }

    return vScale;

}

// returns 3D cross product of two vectors
function vectorCross(a, b) {

    return norm = [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];

}

// returns nD dot product
function vectorDot(a, b) {

    var dot = 0;

    for (var i = 0; i < a.length; i++) {

        dot += a[i] * b[i];

    }

    return dot;

}

// calculates intersection of a line and a sphere 
// TODO: assumes line intersects sphere
function lineSphereIntersection(a, b) {

    var ab = vectorDiff(a, b);

    var A = vectorDot(ab, ab), B = 2 * vectorDot(b, ab), C = vectorDot(b, b) - 1;

    var l1 = (-B + Math.sqrt(B ** 2 - 4 * A * C)) / (2 * A);
    var l2 = (-B - Math.sqrt(B ** 2 - 4 * A * C)) / (2 * A);

    var l = Math.min(l1, l2);
    return intersection = vectorSum(vectorScale(a, l), vectorScale(b, 1 - l));

}

// midpoint of a line
function midpoint(a, b, c, compact) {

    return vectorScale(vectorSum(a, b), 0.5);

}

// returns nD euclidean norm of a vector
function norm(x) {

    return Math.sqrt(vectorDot(x, x));

}

// returns distance between two points
function distance(x, y) {

    return norm(vectorDiff(x, y));

}

// returns circumradius of a triangle with sides of length a, b, c
function circumradius(a, b, c) {

    return (a * b * c) / Math.sqrt(Math.abs((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)));

}

// returns circumcenter of a triangle with vertces u, v, w
function circumcenter(u, v, w) {

    const a = determinant([[u[0], u[1], 1], [v[0], v[1], 1], [w[0], w[1], 1]]);
    const ru = u[0] ** 2 + u[1] ** 2, rv = v[0] ** 2 + v[1] ** 2, rw = w[0] ** 2 + w[1] ** 2;
    const bx = -determinant([[ru, u[1], 1], [rv, v[1], 1], [rw, w[1], 1]]);
    const by = determinant([[ru, u[0], 1], [rv, v[0], 1], [rw, w[0], 1]]);

    return [-bx / (2 * a), -by / (2 * a)]

}

// returns 2x2 determinant
function determinant2(m) {

    return m[0][0] * m[1][1] - m[0][1] * m[1][0];

}

// returns 3x3 determinat
function determinant3(m) {

    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

}

// transforms the baseVertices with the word 'transformation' using the dictionary
function transformVertices(baseVertices, transformation, dictionary) {

    var newVertices = [];
    var e1 = [1, 0, 0, 0], e2 = [0, 1, 0, 0], e3 = [0, 0, 1, 0], e4 = [0, 0, 0, 1];

    if (transformation !== '') {

        for (var i = transformation.length - 1; i > -1; i--) {

            e1 = dictionary(transformation[i], e1);
            e2 = dictionary(transformation[i], e2);
            e3 = dictionary(transformation[i], e3);
            e4 = dictionary(transformation[i], e4);

        }

    }

    for (var j = 0; j < baseVertices.length; j++) {

        var oldVertex = baseVertices[j];
        var newVertex = vectorSum(
            vectorSum(
                vectorScale(e1, oldVertex[0]),
                vectorScale(e2, oldVertex[1])
            ),
            vectorSum(
                vectorScale(e3, oldVertex[2]),
                vectorScale(e4, oldVertex[3])
            )
        );

        newVertices.push(newVertex);

    }

    return newVertices;

}

export {
    vectorScale,
    vectorSum,
    vectorDiff,
    vectorCross,
    vectorDot,
    midpoint,
    norm,
    distance,
    lineSphereIntersection,
    circumradius,
    circumcenter,
    determinant2,
    determinant3,
    transformVertices
}