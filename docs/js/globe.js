(function () {
  const container = document.getElementById("globe");
  const canvas = container.getElementsByTagName("canvas")[0];

  const globeRadius = 100;
  const globeWidth = 4098 / 2;
  const globeHeight = 1968 / 2;

  const convertFlatCoordsToSphereCoords = (x, y) => {
    let latitude = ((x - globeWidth) / globeWidth) * -180;
    let longitude = ((y - globeHeight) / globeHeight) * -90;
    latitude = (latitude * Math.PI) / 180;
    longitude = (longitude * Math.PI) / 180;
    const radius = Math.cos(longitude) * globeRadius;

    return {
      x: Math.cos(latitude) * radius,
      y: Math.sin(longitude) * globeRadius,
      z: Math.sin(latitude) * radius,
    };
  };

  const createGlobe = (points) => {
    const { width, height } = container.getBoundingClientRect();

    // 1. Setup scene
    const scene = new THREE.Scene();
    // 2. Setup camera
    const camera = new THREE.PerspectiveCamera(45, width / height);
    // 3. Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(width, height);
    // 4. Add points to canvas
    // - Single geometry to contain all points.
    const mergedGeometry = new THREE.Geometry();
    // - Material that the dots will be made of.
    const pointGeometry = new THREE.SphereGeometry(0.5, 1, 1);
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: "#D1D5DB",
    });

    for (let point of points) {
      const { x, y, z } = convertFlatCoordsToSphereCoords(
        point.x,
        point.y,
        width,
        height
      );

      if (x && y && z) {
        pointGeometry.translate(x, y, z);
        mergedGeometry.merge(pointGeometry);
        pointGeometry.translate(-x, -y, -z);
      }
    }

    const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial);
    scene.add(globeShape);

    // Setup orbital controls
    camera.orbitControls = new THREE.OrbitControls(camera, canvas);
    camera.orbitControls.enableKeys = false;
    camera.orbitControls.enablePan = false;
    camera.orbitControls.enableZoom = false;
    camera.orbitControls.enableDamping = false;
    camera.orbitControls.enableRotate = true;
    camera.orbitControls.autoRotate = true;
    camera.position.z = -265;

    const animate = () => {
      // orbitControls.autoRotate is enabled so orbitControls.update
      // must be called inside animation loop.
      camera.orbitControls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };

  const hasWebGL = () => {
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    } else {
      return false;
    }
  };

  const init = () => {
    if (hasWebGL()) {
      window
        .fetch(
          "https://raw.githubusercontent.com/timc1/svg-to-coordinates/master/points.json"
        )
        .then((response) => response.json())
        .then((data) => {
          createGlobe(data.points);
        });
    }
  };
  init();
})();
