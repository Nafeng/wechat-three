export default class GameObjects {
  constructor(scene) {
    this.createObjects(scene)
  }

  createObjects(scene) {
    var triangles = 1000;
    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(triangles * 3 * 3);
    var normals = new Float32Array(triangles * 3 * 3);
    var colors = new Float32Array(triangles * 3 * 3);
    var color = new THREE.Color();
    var n = 800, n2 = n / 2;	// triangles spread in the cube
    var d = 120, d2 = d / 2;	// individual triangle size
    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();
    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();
    for (var i = 0; i < positions.length; i += 9) {
      // positions
      var x = Math.random() * n - n2;
      var y = Math.random() * n - n2;
      var z = Math.random() * n - n2;
      var ax = x + Math.random() * d - d2;
      var ay = y + Math.random() * d - d2;
      var az = z + Math.random() * d - d2;
      var bx = x + Math.random() * d - d2;
      var by = y + Math.random() * d - d2;
      var bz = z + Math.random() * d - d2;
      var cx = x + Math.random() * d - d2;
      var cy = y + Math.random() * d - d2;
      var cz = z + Math.random() * d - d2;
      positions[i] = ax;
      positions[i + 1] = ay;
      positions[i + 2] = az;
      positions[i + 3] = bx;
      positions[i + 4] = by;
      positions[i + 5] = bz;
      positions[i + 6] = cx;
      positions[i + 7] = cy;
      positions[i + 8] = cz;
      // flat face normals
      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);
      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      cb.cross(ab);
      cb.normalize();
      var nx = cb.x;
      var ny = cb.y;
      var nz = cb.z;
      normals[i] = nx;
      normals[i + 1] = ny;
      normals[i + 2] = nz;
      normals[i + 3] = nx;
      normals[i + 4] = ny;
      normals[i + 5] = nz;
      normals[i + 6] = nx;
      normals[i + 7] = ny;
      normals[i + 8] = nz;
      // colors
      var vx = (x / n) + 0.5;
      var vy = (y / n) + 0.5;
      var vz = (z / n) + 0.5;
      color.setRGB(vx, vy, vz);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
      colors[i + 3] = color.r;
      colors[i + 4] = color.g;
      colors[i + 5] = color.b;
      colors[i + 6] = color.r;
      colors[i + 7] = color.g;
      colors[i + 8] = color.b;
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();
    var material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
      side: THREE.DoubleSide, vertexColors: THREE.VertexColors
    });
    this.mesh = new THREE.Mesh(geometry, material);
    scene.add(this.mesh);
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
    var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2, transparent: true });
    this.line = new THREE.Line(geometry, material);
    this.line.visible = false;
    scene.add(this.line);
  }

  onUpdate(time, raycaster) 
  {
    if (raycaster) {
      var intersects = raycaster.intersectObject(this.mesh);
      if (intersects.length > 0) {
        var intersect = intersects[0];
        var face = intersect.face;
        var linePosition = this.line.geometry.attributes.position;
        var meshPosition = this.mesh.geometry.attributes.position;
        linePosition.copyAt(0, meshPosition, face.a);
        linePosition.copyAt(1, meshPosition, face.b);
        linePosition.copyAt(2, meshPosition, face.c);
        linePosition.copyAt(3, meshPosition, face.a);
        this.mesh.updateMatrix();
        this.line.geometry.applyMatrix(this.mesh.matrix);
        this.line.visible = true;
      } else {
        this.line.visible = false;
      }
    } else {
      this.line.visible = false;
    }
  }
}