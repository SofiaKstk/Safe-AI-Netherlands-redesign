/* SAIN three.js plates. Flat, line-based, self-bounding (auto-fit to container).
   Usage: <sain-viz variant="progress|mark|network"></sain-viz>  (needs global THREE) */
(function () {
  const NAVY = 0x021c4d;
  const ORANGE = 0xff6025;

  const hairline = (c, o) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o });
  const flat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o === undefined ? 1 : o });
  function lineFrom(points, mat) {
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), mat);
  }

  function buildProgress(group) {
    const span = 4.2, rows = 8;
    for (let i = 0; i <= rows; i++) {
      const t = -span / 2 + (span / rows) * i;
      group.add(lineFrom([new THREE.Vector3(-span / 2, 0, t), new THREE.Vector3(span / 2, 0, t)], hairline(NAVY, 0.1)));
      group.add(lineFrom([new THREE.Vector3(t, 0, -span / 2), new THREE.Vector3(t, 0, span / 2)], hairline(NAVY, 0.1)));
    }
    const n = 28, curve = [];
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const h = 0.08 + Math.pow(u, 2.1) * 2.7;
      const x = -span / 2 + u * span;
      const hot = u > 0.8;
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.05, h, 0.05), flat(hot ? ORANGE : NAVY, hot ? 1 : 0.75));
      m.position.set(x, h / 2, 0);
      group.add(m);
      curve.push(new THREE.Vector3(x, h, 0));
    }
    group.add(lineFrom(curve, hairline(ORANGE, 0.5)));
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 14), flat(ORANGE, 1));
    tip.position.copy(curve[curve.length - 1]);
    group.add(tip);
    group.add(lineFrom([new THREE.Vector3(-span / 2, 0, 0), new THREE.Vector3(-span / 2, 2.9, 0)], hairline(NAVY, 0.22)));
    for (let i = 1; i <= 3; i++) {
      group.add(lineFrom([new THREE.Vector3(-span / 2 - 0.08, i * 0.9, 0), new THREE.Vector3(-span / 2, i * 0.9, 0)], hairline(NAVY, 0.22)));
    }
    group.rotation.set(0.12, -0.46, 0);
    return { spin: 0, fit: 0.62 };
  }

  function buildMark(group) {
    const L = 1.8, r = 0.115;
    // four axes, 45° apart, in one plane — orange cross + navy saltire, as in the logo
    const axes = [[0, ORANGE], [45, NAVY], [90, ORANGE], [135, NAVY]];
    axes.forEach(function (a) {
      const rad = (a[0] * Math.PI) / 180;
      const dir = new THREE.Vector3(Math.cos(rad), Math.sin(rad), 0);
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L * 2, 28, 1, true), flat(a[1], 1));
      rod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      group.add(rod);
      [-1, 1].forEach(function (s) {
        const cap = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), flat(a[1], 1));
        cap.position.copy(dir.clone().multiplyScalar(L * s));
        group.add(cap);
      });
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 20), flat(0xffffff, 1));
    core.position.z = 0.34;
    core.renderOrder = 2;
    group.add(core);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.012, 8, 72), flat(NAVY, 0.85));
    ring.position.z = 0.36;
    ring.renderOrder = 3;
    group.add(ring);
    group.rotation.set(0.06, 0.04, 0);
    return { spin: 0.03, axis: 'z' };
  }

  function buildNetwork(group) {
    const nodes = [], count = 30;
    for (let i = 0; i < count; i++) {
      const a = i * 2.399963;
      const rad = 2.1 * Math.sqrt(i / count);
      nodes.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(i * 1.6) * 0.28, Math.sin(a) * rad));
    }
    nodes.forEach(function (v, i) {
      const hub = i % 7 === 0;
      const m = new THREE.Mesh(new THREE.SphereGeometry(hub ? 0.08 : 0.042, 20, 14), flat(hub ? ORANGE : NAVY, hub ? 1 : 0.72));
      m.position.copy(v);
      group.add(m);
    });
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.92) group.add(lineFrom([nodes[i], nodes[j]], hairline(NAVY, 0.16)));
      }
    }
    group.rotation.set(0.62, 0, 0);
    return { spin: 0.035 };
  }

  const BUILDERS = { progress: buildProgress, mark: buildMark, network: buildNetwork };

  class SainViz extends HTMLElement {
    connectedCallback() {
      if (this._raf) return;
      this.style.display = 'block';
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%';
      this.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);

      const pivot = new THREE.Group();
      const group = new THREE.Group();
      pivot.add(group);
      scene.add(pivot);

      const cfg = (BUILDERS[this.getAttribute('variant')] || buildMark)(group);
      const base = { x: group.rotation.x, y: group.rotation.y, z: group.rotation.z };

      // self-bounding: centre the object and scale it to the visible frustum
      const box = new THREE.Box3().setFromObject(group);
      const centre = box.getCenter(new THREE.Vector3());
      group.children.forEach(function (c) { c.position.sub(centre); });
      const radius = box.getSize(new THREE.Vector3()).length() / 2;

      const resize = () => {
        const w = this.clientWidth || 1, h = this.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const vh = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z;
        const vw = vh * camera.aspect;
        pivot.scale.setScalar((Math.min(vh, vw) * (cfg.fit || 0.46)) / radius);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(this);

      const clock = new THREE.Clock();
      const tick = () => {
        this._raf = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        if (!cfg.spin) {
          // static plate
        } else if (cfg.axis === 'z') {
          group.rotation.z = base.z + t * cfg.spin;
        } else {
          group.rotation.y = base.y + t * cfg.spin;
          group.rotation.x = base.x + Math.sin(t * 0.22) * 0.012;
        }
        renderer.render(scene, camera);
      };
      tick();

      this._cleanup = () => { cancelAnimationFrame(this._raf); this._raf = null; ro.disconnect(); renderer.dispose(); };
    }
    disconnectedCallback() { if (this._cleanup) this._cleanup(); }
  }
  if (!customElements.get('sain-viz')) customElements.define('sain-viz', SainViz);
})();
