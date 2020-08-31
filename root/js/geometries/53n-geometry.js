import * as THREE from "../three.module.js";

import * as ORDER4 from "../data/compact/534.js";
import * as ORDER5 from "../data/compact/535.js";
import * as ORDER6 from "../data/paracompact/536.js";
import * as ORDERN from "../data/general-types/53n.js";

import * as FACE from "../faces/klein-pentagon-faces.js";

import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function hyperbolicDodecahedronGeometry(order, n, transform, s) {

    var vertices = ORDERN.vertices;
    var faces = ORDERN.faces;
    var dict, f, center;

    if (order == 4) {

        dict = ORDER4.matrixDict;
        f = ORDER4.f;
        center = ORDER4.center;

    } else if (order == 5) {

        dict = ORDER5.matrixDict;
        f = ORDER5.f;
        center = ORDER5.center;

    } else if (order == 6) {

        dict = ORDER6.matrixDict;
        f = ORDER6.f;
        center = ORDER6.center;

    } else {

        dict = ORDERN.matrixDict(order);
        f = ORDERN.f(order);
        center = ORDERN.center(order);

    }

    var newVertices = HF.transformVertices(vertices, transform, dict);
    var kleinVertices = [];
    for (var i = 0; i < newVertices.length; i++) {

        kleinVertices[i] = HF.hyperboloidToKlein(f(newVertices[i]));

    }

    var newCenter = HF.transformVertices([center], transform, dict);
    var kleinCenter = f(newCenter[0]);

    var cellGeometry = [];

    for (var i = 0; i < faces.length; i++) {

        var geometry = new THREE.Geometry();
        var faceData;

        faceData = FACE.kleinFace(
            kleinVertices[faces[i][0]],
            kleinVertices[faces[i][1]],
            kleinVertices[faces[i][2]],
            kleinVertices[faces[i][3]],
            kleinVertices[faces[i][4]],
            n
        );
 
        var facets = faceData[0];
        var hyperboloidVertices = faceData[1];

        for (var j = 0; j < hyperboloidVertices.length; j++) {

            var vertex = HF.kleinToPoincare(hyperboloidVertices[j]);
            var vertex2 = VF.vectorSum(VF.vectorScale(vertex, 1 - s), VF.vectorScale(kleinCenter, s));
            geometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

        }

        for (var k = 0; k < facets.length; k++) {

            var facetPiece = facets[k];
            geometry.faces.push(new THREE.Face3(facetPiece[(transform.length + (n % 2) + 1) % 2], facetPiece[2], facetPiece[(transform.length + (n % 2)) % 2]));

        }

        geometry.mergeVertices();
        geometry.name = [ORDERN.faceReflections[i], transform, faces[i]];
        cellGeometry.push(geometry);

    }

    return cellGeometry;
}

export { hyperbolicDodecahedronGeometry };