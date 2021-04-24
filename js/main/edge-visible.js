import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";

window.onload = main;

function main() {

    var p = 3, q = 3, r = 3;
    var thetax = 0, thetay = 0, thetaz = 0, thetau = 0, thetav = 0, thetaw = 0;
    var invisible = false;
    var intersection = true;
    var geom = {};

    const canvas = document.getElementById("c");

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(0, 10, 0);
    camera.up = new THREE.Vector3(0, 0, 1);

    scene.add(camera);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var data = {
        p: p,
        q: q,
        r: r,
        model: "uhp",
        refinement: 50,
        intersection: intersection,
        invisibleLines: invisible,
        position: [0, 0, 0],
        cells: ["d"],
        numFaces: 200
    }

    geom = objectMaker(data);
    var metric = data.metric;

    lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

    render();

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {

        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            geom = objectMaker(data);
            metric = geom.metric;
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
        }
    });

    window.addEventListener("touchend", () => {
        geom = objectMaker(data);
        metric = geom.metric;
    }, false);

    document.getElementById("myRangep").oninput = function () {
        data.p = this.value;
        geom = objectMaker(data);
        metric = geom.metric;
    };

    document.getElementById("myRangeq").oninput = function () {
        data.q = this.value;
        geom = objectMaker(data);
        metric = geom.metric;
    };

    document.getElementById("myRanger").oninput = function () {
        data.r = this.value;
        geom = objectMaker(data);
        metric = geom.metric;
    };

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangeu").oninput = function () {
        (metric === "h" || metric === "p" || metric === "u") ? thetau = (this.value / 20) - 2.5 :
            (metric === "e") ? thetau = (this.value / 10) - 5 :
                (metric === "s") ? thetau = Math.PI * this.value / 50 - Math.PI : this.value;

        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangev").oninput = function () {
        (metric === "h" || metric === "p" || metric === "u") ? thetav = (this.value / 20) - 2.5 :
            (metric === "e") ? thetav = (this.value / 10) - 5 :
                (metric === "s") ? thetav = Math.PI * this.value / 50 - Math.PI : this.value;

        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangew").oninput = function () {
        (metric === "h" || metric === "p" || metric === "u") ? thetaw = (this.value / 20) - 2.5 :
            (metric === "e") ? thetaw = (this.value / 10) - 5 :
                (metric === "s") ? thetaw = Math.PI * this.value / 50 - Math.PI : this.value;

        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("visibleLines").addEventListener("click", function () {
        data.invisibleLines = !data.invisibleLines;
    });

    document.getElementById("intersection").addEventListener("click", function () {
        data.intersection = !data.intersection;
    });

}