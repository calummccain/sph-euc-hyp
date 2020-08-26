import * as VF from "../maths-functions/vector-functions.js";

function sphereFace(a, b, c, d, n) {

    //centre of face
    var fUnscaled = VF.vectorSum(a, VF.vectorSum(b, VF.vectorSum(c, d)));
    var f = VF.vectorScale(fUnscaled, 0.2);

    var coords = [a, b, c, d, f];
    var faces = [[0, 2, 4], [2, 3, 4], [3, 1, 4], [1, 0, 4]];

    var j = 0;

    while (j < n) {

        var newCoords = [];
        var newFaces = [];

        for (var i = 0; i < faces.length; i++) {

            var u = VF.midpoint(coords[faces[i][0]], coords[faces[i][1]]);
            var v = VF.midpoint(coords[faces[i][1]], coords[faces[i][2]]);
            var w = VF.midpoint(coords[faces[i][2]], coords[faces[i][0]]);

            newCoords = newCoords.concat([
                coords[faces[i][0]],
                coords[faces[i][1]],
                coords[faces[i][2]],
                u,
                v,
                w
            ]);

            newFaces = newFaces.concat([
                [6 * i, 6 * i + 5, 6 * i + 3],
                [6 * i + 3, 6 * i + 4, 6 * i + 1],
                [6 * i + 5, 6 * i + 2, 6 * i + 4],
                [6 * i + 3, 6 * i + 5, 6 * i + 4]
            ]);
        }

        faces = newFaces;
        coords = newCoords;
        j++;

    }

    return [faces, coords];
}

export { sphereFace };