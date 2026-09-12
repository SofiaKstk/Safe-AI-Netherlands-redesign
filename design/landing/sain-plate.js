/* SAIN 2D funnel plate (PixiJS) with in-figure labels.
   Usage: <sain-plate variant="funnel"></sain-plate>  (needs global PIXI) */
(function () {
  const NAVY = 0x021c4d;
  const ORANGE = 0xff6025;
  const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

  const STEPS = [
    { n: '01', label: 'Join a free course' },
    { n: '02', label: 'Contribute to research or a chapter' },
    { n: '03', label: 'Move into full-time impact' }
  ];

  class SainPlate extends HTMLElement {
    connectedCallback() {
      if (this._app) return;
      this.style.display = 'block';
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%';
      this.appendChild(canvas);

      const app = new PIXI.Application({
        view: canvas, backgroundAlpha: 0, antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2), autoDensity: true,
        width: this.clientWidth || 320, height: this.clientHeight || 300
      });
      this._app = app;
      const g = new PIXI.Graphics();
      app.stage.addChild(g);

      const labels = STEPS.map(function (s) {
        const num = new PIXI.Text(s.n, { fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, fill: ORANGE });
        const title = new PIXI.Text(s.label, {
          fontFamily: 'Newsreader, Georgia, serif', fontSize: 15.5, fill: NAVY,
          wordWrap: true, wordWrapWidth: 180, align: 'center', lineHeight: 20
        });
        title.anchor.set(0.5, 0.5);
        app.stage.addChild(num, title);
        return { num: num, title: title };
      });

      let t = 0;
      app.ticker.add(function () {
        t += app.ticker.deltaMS / 1000;
        const w = app.renderer.width / app.renderer.resolution;
        const h = app.renderer.height / app.renderer.resolution;
        const rev = ease(t / 1.4);
        const cx = w / 2, top = 6, gap = 10, tail = 26;
        const bh = (h - top - tail - gap * 2) / 3;
        const maxW = Math.min(w - 8, 340);
        const widths = [[1, 0.78], [0.78, 0.58], [0.58, 0.4]];

        g.clear();
        widths.forEach(function (band, i) {
          const show = Math.min(1, Math.max(0, rev * 3 - i));
          const y = top + i * (bh + gap);
          const wTop = maxW * band[0], wBot = maxW * band[1];
          g.lineStyle({ width: 1, color: i === 2 ? ORANGE : NAVY, alpha: (i === 2 ? 0.5 : 0.3) * show });
          g.beginFill(i === 2 ? ORANGE : NAVY, (i === 2 ? 0.07 : 0.025) * show);
          g.moveTo(cx - wTop / 2, y);
          g.lineTo(cx + wTop / 2, y);
          g.lineTo(cx + wBot / 2, y + bh);
          g.lineTo(cx - wBot / 2, y + bh);
          g.closePath();
          g.endFill();

          const lab = labels[i];
          lab.title.style.wordWrapWidth = Math.max(64, Math.min(wTop, wBot) - 24);
          lab.title.position.set(cx, y + bh / 2 + 4);
          lab.title.alpha = show;
          lab.num.position.set(cx - lab.num.width / 2, y + bh / 2 - lab.title.height / 2 - 14);
          lab.num.alpha = show * 0.9;
        });

        const yEnd = top + 3 * bh + gap * 2;
        g.lineStyle({ width: 1, color: NAVY, alpha: 0.18 * rev });
        g.moveTo(cx, yEnd); g.lineTo(cx, yEnd + 12);
        g.lineStyle(0);
        g.beginFill(ORANGE, rev);
        g.drawCircle(cx, yEnd + 18, 3.6);
        g.endFill();
      });

      const ro = new ResizeObserver(() => app.renderer.resize(this.clientWidth || 1, this.clientHeight || 1));
      ro.observe(this);
      this._ro = ro;
    }
    disconnectedCallback() {
      if (this._ro) this._ro.disconnect();
      if (this._app) { this._app.destroy(false, { children: true }); this._app = null; }
    }
  }
  if (!customElements.get('sain-plate')) customElements.define('sain-plate', SainPlate);
})();
