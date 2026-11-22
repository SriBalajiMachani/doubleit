(function () {
      "use strict";

      /* ------------------------------------------------------------------------
         A. MONOLINE HANDWRITTEN SCRIPT ENGINE
         ------------------------------------------------------------------------ */
      const SCRIPT_STROKE = 34;
      const SCRIPT_TOP = -230;
      const SCRIPT_BOTTOM = 125;
      const SCRIPT_UNIT = 0.0052;
      const SCRIPT_PAD_L = 70;
      const SCRIPT_PAD_R = 90;
      const PEN_SPEED = 1700;
      const PEN_LIFT = 0.05;

      const IN = "M0,-14C6,-20 ";
      const out = (w) => " " + (w - 7) + ",-7 " + w + ",-14";
      const outFlat = (w) => " " + (w - 6) + ",-12 " + w + ",-14";
      const bowl = (l, r) => {
        const m = (l + r) / 2;
        return "C" + (m + 6) + ",-104 " + (l + 2) + ",-92 " + l + ",-52C" + (l - 1) + ",-18 " + (l + 12) + ",-3 " + (m - 2) + ",-3C" + (r - 8) + ",-3 " + (r + 2) + ",-30 " + (r + 2) + ",-62";
      };
      const over = (l, r) => IN + (l - 2) + ",-50 " + (l + 14) + ",-88C" + (l + 26) + ",-104 " + (r - 10) + ",-104 " + r + ",-94";
      const down = (x, w) => "C" + (x - 1) + ",-60 " + (x - 4) + ",-24 " + (x - 2) + ",-12C" + x + ",-2 " + (x + 8) + ",-1 " + (x + 14) + ",-4C" + (w - 12) + ",-6" + out(w);
      const stem = (x, top, w) => "M" + x + "," + top + down(x, w);
      const arch = (x0, x1) => "C" + (x0 + 4) + ",-60 " + (x0 + 14) + ",-98 " + ((x0 + x1) / 2 + 2) + ",-98C" + (x1 + 6) + ",-98 " + (x1 + 4) + ",-70 " + (x1 + 1) + ",-44";
      const loopUp = (x) => IN + (x + 18) + ",-40 " + (x + 38) + ",-108C" + (x + 52) + ",-152 " + (x + 48) + ",-200 " + (x + 26) + ",-198C" + (x + 4) + ",-196 " + (x - 2) + ",-150 " + x + ",-110";
      const loopDown = (x, w) => "C" + x + ",-30 " + (x - 1) + ",30 " + (x - 6) + ",62C" + (x - 12) + ",94 " + (x - 42) + ",104 " + (x - 48) + ",82C" + (x - 54) + ",58 " + (x - 14) + ",8 " + (x + 12) + ",-6C" + (w - 12) + ",-12" + outFlat(w);
      const entry = (x) => IN + (x - 4) + ",-50 " + x + ",-96";

      const GLYPHS = {
        a: [100, over(18, 70) + bowl(16, 70) + stem(74, -98, 100)],
        b: [92, loopUp(16) + "C16,-60 15,-30 14,-8C24,-60 40,-98 58,-96C76,-94 76,-60 66,-30C58,-6 38,0 30,-12C40,-14 60,-14 74,-12C80,-12 86,-13 92,-14"],
        c: [80, IN + "16,-50 30,-82C42,-104 70,-104 66,-84C64,-76 58,-80 56,-84C50,-98 22,-96 16,-56C12,-24 26,-3 42,-3C58,-3" + out(80)],
        d: [100, over(18, 70) + bowl(16, 70) + stem(78, -192, 100)],
        e: [80, IN + "36,-40 52,-56C66,-72 66,-100 46,-100C24,-100 14,-74 14,-50C14,-20 28,-3 44,-3C58,-3" + out(80)],
        f: [74, loopUp(16) + "C16,-40 18,30 14,70C12,94 -6,96 -4,74C-2,50 30,-2 46,-8C62,-12" + outFlat(74)],
        g: [96, over(18, 70) + bowl(16, 70) + "M72,-98" + loopDown(72, 96)],
        h: [100, loopUp(16) + "C16,-60 15,-30 14,-2" + arch(14, 70) + down(71, 100)],
        i: [52, entry(26) + down(26, 52) + "M30,-146L30,-146"],
        j: [62, entry(26) + loopDown(26, 62) + "M32,-146L32,-146"],
        k: [96, loopUp(16) + "C16,-60 15,-30 14,-2C22,-56 40,-100 60,-98C80,-96 72,-56 30,-50C48,-44 56,-12 66,-6C72,-2 78,-3 84,-6C88,-8" + out(96)],
        l: [60, loopUp(16) + "C16,-60 14,-30 16,-14C18,-2 26,-1 32,-3C48,-6" + out(60)],
        m: [138, entry(18) + "C18,-60 16,-30 14,-2" + arch(14, 56) + "C56,-30 56,-14 56,-2" + arch(56, 108) + down(109, 138)],
        n: [102, entry(18) + "C18,-60 16,-30 14,-2" + arch(14, 72) + down(73, 102)],
        o: [92, IN + "16,-50 32,-88C30,-104 14,-84 14,-54C14,-22 28,-3 44,-3C62,-3 72,-30 70,-60C68,-90 52,-104 44,-94C38,-86 54,-74 66,-60C72,-52 80,-30 92,-14"],
        p: [96, entry(20) + "L14,92M14,-36C18,-60 28,-98 44,-98C76,-98 78,-60 68,-30C60,-6 40,0 30,-12C42,-14 62,-14 76,-13C82,-13 88,-13 96,-14"],
        q: [100, over(18, 70) + bowl(16, 70) + "M74,-98C73,-40 72,40 70,80C69,96 58,92 62,74C68,40 80,-6 100,-14"],
        r: [80, entry(18) + "C18,-60 16,-30 14,-2C20,-50 34,-90 50,-96C60,-100 64,-90 58,-82C54,-78 50,-82 52,-76C56,-50 56,-16 62,-8C66,-3" + out(80)],
        s: [76, IN + "20,-60 34,-100C40,-76 66,-54 58,-26C52,-2 22,0 10,-18C24,-6 50,-6 62,-10C66,-11" + out(76)],
        t: [72, IN + "20,-80 30,-170" + down(30, 72) + "M8,-104C24,-106 44,-108 62,-110"],
        u: [100, entry(18) + "C16,-60 12,-30 14,-16C16,-2 30,-2 42,-6C56,-12 66,-50 70,-96" + down(70, 100)],
        v: [84, entry(18) + "C18,-60 22,-10 38,-4C56,2 66,-40 64,-96C66,-60 70,-24 78,-18C80,-16 82,-15 84,-14"],
        w: [124, entry(18) + "C16,-60 14,-4 34,-4C50,-4 56,-50 58,-80C58,-50 62,-4 82,-4C98,-4 106,-50 104,-96C106,-60 110,-24 118,-18C120,-16 122,-15 124,-14"],
        x: [92, IN + "18,-60 28,-80C38,-100 54,-100 54,-80C54,-50 50,-20 60,-8C66,-2 72,-4 80,-8C84,-10" + out(92) + "M20,-10C38,-40 58,-74 78,-98"],
        y: [96, entry(18) + "C16,-60 12,-30 14,-16C16,-2 30,-2 42,-6C56,-12 66,-50 70,-96" + loopDown(70, 96)],
        z: [88, IN + "20,-60 36,-90C46,-104 70,-104 64,-80C58,-60 34,-34 18,-10C34,-30 64,-24 60,10C56,60 20,96 12,72C6,52 40,-6 70,-12C76,-13 82,-13 88,-14"],
        "!": [56, "M42,-194C38,-150 32,-96 28,-52M22,-8L22,-8"],
        "?": [72, "M10,-160C14,-196 66,-200 62,-160C60,-128 30,-112 30,-60M26,-8L26,-8"],
        ".": [36, "M16,-8L16,-8"],
        ",": [36, "M20,-8C18,10 12,22 4,30"],
        "'": [30, "M22,-192L16,-140"],
        " ": [44, ""]
      };

      function normaliseWord(word) {
        return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[‘’]/g, "'").toLowerCase();
      }

      function computePathLength(d) {
        const nums = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
        const cmds = d.match(/[MLC]/g) || [];
        let i = 0, x = 0, y = 0, len = 0;
        for (const c of cmds) {
          if (c === "M") {
            x = nums[i++];
            y = nums[i++];
          } else if (c === "L") {
            const nx = nums[i++];
            const ny = nums[i++];
            len += Math.hypot(nx - x, ny - y);
            x = nx;
            y = ny;
          } else {
            const p = nums.slice(i, i + 6);
            i += 6;
            let px = x, py = y;
            for (let k = 1; k <= 16; k++) {
              const t = k / 16;
              const u = 1 - t;
              const qx = u * u * u * x + 3 * u * u * t * p[0] + 3 * u * t * t * p[2] + t * t * t * p[4];
              const qy = u * u * u * y + 3 * u * u * t * p[1] + 3 * u * t * t * p[3] + t * t * t * p[5];
              len += Math.hypot(qx - px, qy - py);
              px = qx;
              py = qy;
            }
            x = p[4];
            y = p[5];
          }
        }
        return len;
      }

      function layoutScriptWord(word) {
        const glyphs = [];
        let x = 0;
        for (const ch of normaliseWord(word)) {
          const g = GLYPHS[ch] || GLYPHS[" "];
          const strokes = [];
          const dots = [];
          for (const sub of g[1].split(/(?=M)/)) {
            if (!sub) continue;
            const dot = sub.match(/^M(-?[\d.]+),(-?[\d.]+)L\1,\2$/);
            if (dot) dots.push([+dot[1], +dot[2]]);
            else strokes.push({ d: sub, len: computePathLength(sub) });
          }
          glyphs.push({ ch: ch, x: x, strokes: strokes, dots: dots });
          x += g[0];
        }
        return { glyphs: glyphs, width: x };
      }

      function timeScriptWord(glyphs) {
        let t = 0;
        const timed = glyphs.map(function (g) {
          const strokes = g.strokes.map(function (s) {
            const at = { d: s.d, len: s.len, delay: t, dur: Math.max(0.08, s.len / PEN_SPEED) };
            t += at.dur + PEN_LIFT;
            return at;
          });
          const dots = g.dots.map(function (p) {
            const at = { x: p[0], y: p[1], delay: t };
            t += 0.08;
            return at;
          });
          return { ch: g.ch, x: g.x, strokes: strokes, dots: dots };
        });
        return { glyphs: timed, total: t };
      }

      function clampOffset(v, min, max) {
        return min > max ? (min + max) / 2 : Math.min(max, Math.max(min, v));
      }

      function springStep(x, v, target, k, damp) {
        const nv = (v + (target - x) * k) * damp;
        return [x + nv, nv];
      }

      /* ------------------------------------------------------------------------
         B. FRUIT STICKER VECTOR ARTWORK & SPRING PHYSICS HERO
         ------------------------------------------------------------------------ */
      const FRUITS = ["strawberry", "banana", "chili", "orange", "cherry", "lemon", "watermelon", "pear"];
      const FRUIT_PAPER = {
        strawberry: "#f7cf45",
        banana: "#3f6fe6",
        chili: "#f6a9c4",
        orange: "#cdb8f2",
        cherry: "#bfe5c6",
        lemon: "#ff8f70",
        watermelon: "#fde7a6",
        pear: "#ffb8a6"
      };
      const FRUIT_NAMES = {
        strawberry: "Strawberry",
        banana: "Banana",
        chili: "Chili",
        orange: "Orange",
        cherry: "Cherries",
        lemon: "Lemon",
        watermelon: "Watermelon",
        pear: "Pear"
      };

      const STRAWBERRY_SEEDS = [
        [-21, -13], [-6, -15], [9, -15], [24, -12], [-27, 2], [-13, 0], [2, 0],
        [17, 0], [29, 3], [-18, 14], [-3, 15], [12, 14], [-9, 27], [5, 27]
      ];

      function fruitArtSVG(fruit) {
        switch (fruit) {
          case "strawberry":
            return (
              '<g>' +
              '<path fill="#e8333d" d="M0,40C-13,40 -37,17 -39,-5C-41,-22 -29,-31 -15,-29C-8,-28 -3,-26 0,-25C3,-26 8,-28 15,-29C29,-31 41,-22 39,-5C37,17 13,40 0,40Z"/>' +
              '<path fill="#c51f2d" d="M39,-5C37,17 13,40 0,40C11,31 27,11 29,-9C30,-19 27,-26 22,-29C33,-28 41,-20 39,-5Z"/>' +
              '<ellipse cx="-24" cy="-12" rx="7" ry="3.6" fill="#fff" opacity="0.38" transform="rotate(-38 -24 -12)"/>' +
              STRAWBERRY_SEEDS.map(function (pt) {
                return '<ellipse cx="' + pt[0] + '" cy="' + pt[1] + '" rx="1.7" ry="3" fill="#8c1121" opacity="0.75" transform="rotate(' + (pt[0] * 0.6) + ' ' + pt[0] + ' ' + pt[1] + ')"/>';
              }).join("") +
              '<path fill="#43ab4c" stroke="#43ab4c" stroke-width="3" stroke-linejoin="round" d="M0,-24L-22,-30L-10,-33L-17,-43L-4,-37L0,-47L4,-37L17,-43L10,-33L22,-30Z"/>' +
              '<path d="M0,-40C1,-46 3,-50 8,-53" fill="none" stroke="#2f8a3c" stroke-width="4" stroke-linecap="round"/>' +
              '</g>'
            );
          case "banana":
            return (
              '<g transform="rotate(-8)">' +
              '<g transform="translate(-3,-13) rotate(-10)">' +
              '<path fill="#ffe27a" d="M-38,-14C-34,12 2,30 32,8L36,4C38,2 36,-2 33,-1C10,12 -18,6 -30,-16C-32,-20 -38,-19 -38,-14Z"/>' +
              '<path fill="#efb93a" d="M-38,-14C-34,12 2,30 32,8C4,22 -26,10 -38,-14Z"/>' +
              '<path fill="#7a5a2e" d="M33,-1L40,-6L43,-2L36,4Z"/>' +
              '</g>' +
              '<path fill="#ffd43c" d="M-38,-14C-34,12 2,30 32,8L36,4C38,2 36,-2 33,-1C10,12 -18,6 -30,-16C-32,-20 -38,-19 -38,-14Z"/>' +
              '<path fill="#e9a920" d="M-38,-14C-34,12 2,30 32,8C4,22 -26,10 -38,-14Z"/>' +
              '<path d="M-26,-6C-14,8 6,12 22,6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.45"/>' +
              '<ellipse cx="-36" cy="-16" rx="2.6" ry="3.2" fill="#5b4020"/>' +
              '<path fill="#7a5a2e" d="M33,-1L41,-7L44,-2L36,4Z"/>' +
              '</g>'
            );
          case "chili":
            return (
              '<g transform="scale(1.18) rotate(-8)">' +
              '<path fill="#e8392b" d="M-38,16C-24,26 8,22 26,2C32,-4 30,-12 22,-10C8,0 -12,8 -34,8C-40,8 -42,13 -38,16Z"/>' +
              '<path fill="#c02a1f" d="M-38,16C-24,26 8,22 26,2C10,16 -16,20 -38,16Z"/>' +
              '<path d="M-26,10C-10,8 6,2 16,-5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity="0.42"/>' +
              '<path fill="#4aa944" d="M19,-11C23,-18 32,-18 34,-10C35,-4 29,0 24,-2C22,-6 20,-8 19,-11Z"/>' +
              '<path d="M30,-15C31,-24 37,-29 44,-27" fill="none" stroke="#3a8d39" stroke-width="4" stroke-linecap="round"/>' +
              '</g>'
            );
          case "orange":
            return (
              '<g transform="scale(1.12)">' +
              '<circle r="32" fill="#ff8b1d"/>' +
              '<path fill="#ee700f" d="M32,0A32,32 0 0 1 -20,25C2,30 26,20 32,0Z"/>' +
              '<ellipse cx="-13" cy="-15" rx="8" ry="4.2" fill="#fff" opacity="0.38" transform="rotate(-38 -13 -15)"/>' +
              '<circle cx="0" cy="-30" r="3.4" fill="#3b7a2c"/>' +
              '<path d="M2,-31C8,-44 22,-47 29,-41C23,-32 11,-28 2,-31Z" fill="#46ad4f"/>' +
              '<path d="M5,-32C12,-37 19,-40 25,-41" fill="none" stroke="#2f8a3c" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>' +
              '</g>'
            );
          case "cherry":
            return (
              '<g transform="translate(0,4)">' +
              '<path d="M-14,4C-12,-14 0,-30 9,-39M16,8C15,-8 13,-26 9,-39" fill="none" stroke="#6f4a26" stroke-width="3.6" stroke-linecap="round"/>' +
              '<path d="M9,-39C17,-51 33,-50 38,-42C28,-35 18,-35 9,-39Z" fill="#46ad4f"/>' +
              '<path d="M12,-39C20,-42 27,-43 34,-43" fill="none" stroke="#2f8a3c" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>' +
              '<circle cx="-14" cy="16" r="16" fill="#d21f37"/>' +
              '<path fill="#a8142a" d="M2,16A16,16 0 0 1 -26,26C-14,34 2,30 2,16Z"/>' +
              '<ellipse cx="-20" cy="9" rx="4.4" ry="2.6" fill="#fff" opacity="0.38" transform="rotate(-40 -20 9)"/>' +
              '<circle cx="16" cy="20" r="16" fill="#e72c45"/>' +
              '<path fill="#b8182f" d="M32,20A16,16 0 0 1 4,30C16,38 32,34 32,20Z"/>' +
              '<ellipse cx="10" cy="13" rx="4.4" ry="2.6" fill="#fff" opacity="0.38" transform="rotate(-40 10 13)"/>' +
              '</g>'
            );
          case "lemon":
            return (
              '<g transform="rotate(-22) scale(1.06)">' +
              '<path fill="#ffe24b" d="M-34,0C-34,-18 -17,-28 0,-28C17,-28 34,-18 34,0C34,18 17,28 0,28C-17,28 -34,18 -34,0ZM-33,-4L-41,-2L-33,4ZM33,-4L41,-1L33,4Z"/>' +
              '<path fill="#f3c22a" d="M34,0C34,18 17,28 0,28C-17,28 -34,18 -34,0C-24,16 20,18 34,0Z"/>' +
              '<ellipse cx="-12" cy="-14" rx="9" ry="4" fill="#fff" opacity="0.38" transform="rotate(-8 -12 -14)"/>' +
              '<path d="M30,-14C36,-28 50,-30 56,-24C50,-14 38,-10 30,-14Z" fill="#46ad4f"/>' +
              '<path d="M33,-15C40,-20 46,-23 52,-24" fill="none" stroke="#2f8a3c" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>' +
              '</g>'
            );
          case "watermelon":
            return (
              '<g transform="translate(0,-4) rotate(8)">' +
              '<path fill="#3d9a49" d="M-42,-10A42,42 0 0 0 42,-10Z"/>' +
              '<path fill="#2f7f3b" d="M-42,-10A42,42 0 0 0 42,-10L36,-10A36,36 0 0 1 -36,-10Z" opacity="0.6"/>' +
              '<path fill="#e9f6cf" d="M-37,-10A37,37 0 0 0 37,-10Z"/>' +
              '<path fill="#ff5068" d="M-33,-10A33,33 0 0 0 33,-10Z"/>' +
              '<path fill="#e53a55" d="M33,-10A33,33 0 0 1 -6,22C14,16 28,4 33,-10Z"/>' +
              '<ellipse cx="-18" cy="-2" rx="1.8" ry="3" fill="#2a1717" transform="rotate(14 -18 -2)"/>' +
              '<ellipse cx="-6" cy="4" rx="1.8" ry="3" fill="#2a1717" transform="rotate(5 -6 4)"/>' +
              '<ellipse cx="8" cy="2" rx="1.8" ry="3" fill="#2a1717" transform="rotate(-6 8 2)"/>' +
              '<ellipse cx="20" cy="-2" rx="1.8" ry="3" fill="#2a1717" transform="rotate(-16 20 -2)"/>' +
              '<ellipse cx="-10" cy="12" rx="1.8" ry="3" fill="#2a1717" transform="rotate(8 -10 12)"/>' +
              '<ellipse cx="4" cy="14" rx="1.8" ry="3" fill="#2a1717" transform="rotate(-3 4 14)"/>' +
              '<path d="M-28,-6C-20,-6 -14,-6 -8,-6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.45"/>' +
              '</g>'
            );
          case "pear":
          default:
            return (
              '<g transform="rotate(10) translate(0,4)">' +
              '<path fill="#b6d74b" d="M0,-30C10,-30 12,-18 14,-10C16,0 30,6 30,20C30,34 16,40 0,40C-16,40 -30,34 -30,20C-30,6 -16,0 -14,-10C-12,-18 -10,-30 0,-30Z"/>' +
              '<path fill="#97bc35" d="M14,-10C16,0 30,6 30,20C30,34 16,40 0,40C14,32 22,20 18,8C16,2 12,-4 14,-10Z"/>' +
              '<ellipse cx="-14" cy="12" rx="5" ry="8" fill="#fff" opacity="0.38" transform="rotate(18 -14 12)"/>' +
              '<path d="M0,-28C0,-36 2,-42 6,-46" fill="none" stroke="#6f4a26" stroke-width="3.6" stroke-linecap="round"/>' +
              '<path d="M3,-38C10,-50 24,-50 28,-43C20,-36 11,-35 3,-38Z" fill="#46ad4f"/>' +
              '<path d="M6,-39C13,-42 19,-43 24,-43" fill="none" stroke="#2f8a3c" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>' +
              '</g>'
            );
        }
      }

      const HERO_STICKERS = [
        { fruit: "watermelon", x: 3, y: 70, size: 0.9, rotate: -10, mx: 13, my: 43, msize: 0.72 },
        { fruit: "lemon", x: 14.5, y: 103, size: 0.72, rotate: 8, mx: 16, my: -18, msize: 0.66 },
        { fruit: "cherry", x: 56, y: -24, size: 0.72, rotate: 8, behind: true, mx: 82, my: -18, msize: 0.68 },
        { fruit: "pear", x: 98, y: 74, size: 0.68, rotate: -6, mx: 87, my: 43, msize: 0.68 }
      ];

      const HERO_HEADLINE = "Portions made,";
      const HERO_WORDS = ["double it!", "scale up!", "batch two!", "multiply!"];

      function initFruitStickerHero() {
        const heroRoot = document.getElementById("fsf-hero-root");
        const stageEl = document.getElementById("fsf-stage");
        const clusterEl = document.getElementById("fsf-cluster");
        const headlineEl = document.getElementById("fsf-headline-chars");
        const scriptBtn = document.getElementById("fsf-script-btn");
        const srTitle = document.getElementById("fsf-sr-title");
        if (!heroRoot || !stageEl || !clusterEl || !headlineEl || !scriptBtn) return;

        // Populate per-letter animated headline characters
        let ci = 0;
        headlineEl.innerHTML = Array.from(HERO_HEADLINE).map(function (ch) {
          const idx = ch === " " ? ci : ci++;
          return '<span class="fsf-ch" style="--i:' + idx + '">' + (ch === " " ? "&nbsp;" : ch) + "</span>";
        }).join("");

        let wordIndex = 0;
        let erasing = false;
        let redraw = false;

        function fmtEm(n) {
          return Number(n.toFixed(4)) + "em";
        }

        function renderScriptWord() {
          const word = HERO_WORDS[wordIndex % HERO_WORDS.length];
          const laid = layoutScriptWord(word);
          const timed = timeScriptWord(laid.glyphs);
          const slotW = laid.width * SCRIPT_UNIT;
          const vbW = laid.width + SCRIPT_PAD_L + SCRIPT_PAD_R;
          const vbH = SCRIPT_BOTTOM - SCRIPT_TOP;

          scriptBtn.style.width = fmtEm(slotW);
          scriptBtn.setAttribute("aria-label", "Cycle handwritten phrase (currently: " + word + ")");
          if (srTitle) srTitle.textContent = HERO_HEADLINE + " " + word;

          function buildLayer(kind) {
            const off = kind === "s" ? "translate(6,8)" : kind === "h" ? "translate(-5,-6)" : "";
            const sw = kind === "h" ? 7 : SCRIPT_STROKE;
            const offsetDelay = kind === "s" ? 0.06 : kind === "h" ? 0.1 : 0;

            return (
              '<g class="fsf-' + kind + '" transform="' + off + '">' +
              timed.glyphs.map(function (g, gi) {
                const strokesHtml = g.strokes.map(function (s) {
                  const lenVal = Math.max(1, Math.ceil(s.len + 6));
                  return (
                    '<path class="fsf-p" d="' + s.d + '" stroke-width="' + sw + '" style="--len:' + lenVal + ';--d:' + (s.delay + offsetDelay).toFixed(3) + "s;--dur:" + s.dur.toFixed(3) + 's"/>'
                  );
                }).join("");
                const dotsHtml = g.dots.map(function (p) {
                  return '<circle class="fsf-dot" cx="' + p.x + '" cy="' + p.y + '" r="' + (kind === "h" ? 4 : SCRIPT_STROKE / 2) + '" style="--d:' + p.delay.toFixed(3) + 's"/>';
                }).join("");
                return '<g transform="translate(' + g.x + ',0)"><g class="fsf-g" style="--gi:' + gi + '">' + strokesHtml + dotsHtml + "</g></g>";
              }).join("") +
              "</g>"
            );
          }

          const svgLeft = fmtEm(-SCRIPT_PAD_L * SCRIPT_UNIT);
          const svgTop = fmtEm(0.8 + SCRIPT_TOP * SCRIPT_UNIT);
          const svgW = fmtEm(vbW * SCRIPT_UNIT);
          const svgH = fmtEm(vbH * SCRIPT_UNIT);
          const baseDelay = redraw ? "0s" : "0.4s";

          scriptBtn.innerHTML =
            '<svg viewBox="' + (-SCRIPT_PAD_L) + " " + SCRIPT_TOP + " " + vbW + " " + vbH + '" style="left:' + svgLeft + ";top:" + svgTop + ";width:" + svgW + ";height:" + svgH + ";--base:" + baseDelay + ";--total:" + timed.total.toFixed(3) + 's" aria-hidden="true">' +
            '<g transform="rotate(-6 0 0) skewX(-10)">' +
            buildLayer("s") +
            buildLayer("m") +
            buildLayer("h") +
            "</g></svg>";
        }

        scriptBtn.addEventListener("click", function () {
          if (erasing) return;
          const nextIdx = (wordIndex + 1) % HERO_WORDS.length;
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (reduced) {
            wordIndex = nextIdx;
            redraw = true;
            renderScriptWord();
            return;
          }
          erasing = true;
          scriptBtn.setAttribute("data-out", "");
          setTimeout(function () {
            wordIndex = nextIdx;
            erasing = false;
            redraw = true;
            scriptBtn.removeAttribute("data-out");
            renderScriptWord();
          }, 380);
        });

        // Sticker physics state
        const currentFruits = HERO_STICKERS.map(function (s) { return s.fruit; });
        const stickerEls = [];
        const bodyEls = [];
        const anim = {
          raf: 0,
          reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          px: 0, py: 0, tpx: 0, tpy: 0,
          s: HERO_STICKERS.map(function () {
            return {
              ox: 0, oy: 0, x: 0, y: 0, vx: 0, vy: 0,
              tilt: 0, lift: 0, liftT: 0, drag: false, moved: false,
              sx: 0, sy: 0, ox0: 0, oy0: 0, min: [-1, -1], max: [1, 1]
            };
          })
        };

        function stepPhysics() {
          const W = clusterEl.offsetWidth || 1;
          let busy = false;
          if (!anim.reduced) {
            anim.px += (anim.tpx - anim.px) * 0.07;
            anim.py += (anim.tpy - anim.py) * 0.07;
            if (Math.abs(anim.tpx - anim.px) > 0.001 || Math.abs(anim.tpy - anim.py) > 0.001) busy = true;
          }
          anim.s.forEach(function (s, i) {
            const el = stickerEls[i];
            if (!el) return;
            const depth = 0.6 + ((i * 37) % 10) / 12;
            const tx = s.ox * W + (s.drag ? 0 : anim.px * 10 * depth);
            const ty = s.oy * W + (s.drag ? 0 : anim.py * 7 * depth);
            if (anim.reduced) {
              s.x = tx; s.y = ty; s.vx = s.vy = 0; s.tilt = 0; s.lift = s.liftT;
            } else {
              const k = s.drag ? 0.42 : 0.16;
              const damp = s.drag ? 0.55 : 0.66;
              const resX = springStep(s.x, s.vx, tx, k, damp);
              const resY = springStep(s.y, s.vy, ty, k, damp);
              s.x = resX[0]; s.vx = resX[1];
              s.y = resY[0]; s.vy = resY[1];
              const tiltT = Math.max(-16, Math.min(16, s.vx * 1.1));
              s.tilt += (tiltT - s.tilt) * 0.2;
              s.lift += (s.liftT - s.lift) * 0.2;
              if (
                Math.abs(tx - s.x) > 0.05 || Math.abs(ty - s.y) > 0.05 ||
                Math.abs(s.vx) > 0.02 || Math.abs(s.vy) > 0.02 ||
                Math.abs(s.tilt) > 0.02 || Math.abs(s.liftT - s.lift) > 0.002
              ) {
                busy = true;
              }
            }
            el.style.transform =
              "translate3d(" + s.x.toFixed(2) + "px," + s.y.toFixed(2) + "px,0) rotate(" + s.tilt.toFixed(2) + "deg) scale(" + (1 + s.lift * 0.08).toFixed(4) + ")";
            el.style.setProperty("--lift", s.lift.toFixed(3));
          });
          anim.raf = busy ? requestAnimationFrame(stepPhysics) : 0;
        }

        function kickPhysics() {
          if (!anim.raf) anim.raf = requestAnimationFrame(stepPhysics);
        }

        function computeBounds(i) {
          const r = heroRoot.getBoundingClientRect();
          const c = clusterEl.getBoundingClientRect();
          const W = c.width || 1;
          const spec = HERO_STICKERS[i];
          const isMobile = heroRoot.offsetWidth <= 640;
          const px = isMobile && spec.mx !== undefined ? spec.mx : spec.x;
          const py = isMobile && spec.my !== undefined ? spec.my : spec.y;
          const hx = c.left + (px / 100) * c.width;
          const hy = c.top + (py / 100) * c.height;
          const pad = 28;
          anim.s[i].min = [(r.left + pad - hx) / W, (r.top + pad - hy) / W];
          anim.s[i].max = [(r.right - pad - hx) / W, (r.bottom - pad - hy) / W];
        }

        function swapStickerFruit(i) {
          const cur = currentFruits[i];
          let next = cur;
          for (let k = 1; k <= FRUITS.length; k++) {
            const candidate = FRUITS[(FRUITS.indexOf(cur) + k) % FRUITS.length];
            if (!currentFruits.includes(candidate)) {
              next = candidate;
              break;
            }
          }
          const body = bodyEls[i];
          function applySwap() {
            currentFruits[i] = next;
            body.style.setProperty("--c", FRUIT_PAPER[next]);
            body.setAttribute("aria-label", FRUIT_NAMES[next] + " sticker. Press Enter to swap fruit or drag to move.");
            const svgEl = body.querySelector("svg");
            if (svgEl) svgEl.innerHTML = fruitArtSVG(next);
          }

          if (anim.reduced || !body.animate) {
            applySwap();
            return;
          }
          const half = body.animate(
            [{ transform: "perspective(30em) rotateY(0deg)" }, { transform: "perspective(30em) rotateY(90deg) scale(1.06)" }],
            { duration: 170, easing: "cubic-bezier(.5,0,.9,.6)", fill: "forwards" }
          );
          half.onfinish = function () {
            applySwap();
            half.cancel();
            body.animate(
              [
                { transform: "perspective(30em) rotateY(-90deg) scale(1.06)" },
                { transform: "perspective(30em) rotateY(14deg)", offset: 0.65 },
                { transform: "perspective(30em) rotateY(0deg)" }
              ],
              { duration: 480, easing: "cubic-bezier(.2,.8,.3,1)" }
            );
          };
        }

        function slapSticker(i) {
          const body = bodyEls[i];
          if (anim.reduced || !body || !body.animate) return;
          body.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(.9,.86)", offset: 0.3 },
              { transform: "scale(1.04)", offset: 0.65 },
              { transform: "scale(1)" }
            ],
            { duration: 460, easing: "cubic-bezier(.3,.7,.4,1)" }
          );
        }

        function setTopSticker(activeIdx) {
          stickerEls.forEach(function (el, idx) {
            if (!el) return;
            el.classList.toggle("is-top", idx === activeIdx);
            el.classList.toggle("is-behind", Boolean(HERO_STICKERS[idx].behind) && idx !== activeIdx);
          });
        }

        function buildStickersDom() {
          const headEl = clusterEl.querySelector(".fsf-head");
          HERO_STICKERS.forEach(function (spec, i) {
            const wrap = document.createElement("div");
            wrap.className = "fsf-stk" + (spec.behind ? " is-behind" : "");
            wrap.style.setProperty("--x", spec.x + "%");
            wrap.style.setProperty("--y", spec.y + "%");
            wrap.style.setProperty("--size", spec.size + "em");
            if (spec.mx !== undefined) wrap.style.setProperty("--mx", spec.mx + "%");
            if (spec.my !== undefined) wrap.style.setProperty("--my", spec.my + "%");
            if (spec.msize !== undefined) wrap.style.setProperty("--msize", spec.msize + "em");

            const inDiv = document.createElement("div");
            inDiv.className = "fsf-stk-in";
            inDiv.style.setProperty("--sd", (0.55 + i * 0.12).toFixed(2) + "s");
            inDiv.style.setProperty("--spin", (i % 2 ? 24 : -24) + "deg");

            const bobDiv = document.createElement("div");
            bobDiv.className = "fsf-stk-bob";
            bobDiv.style.setProperty("--bd", (-i * 1.7) + "s");

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "fsf-stk-body";
            btn.style.setProperty("--c", FRUIT_PAPER[spec.fruit]);
            btn.style.setProperty("--r", spec.rotate + "deg");
            btn.setAttribute("aria-label", FRUIT_NAMES[spec.fruit] + " sticker. Press Enter to swap fruit or drag to move.");
            btn.innerHTML = '<svg class="fsf-fruit" viewBox="-50 -50 100 100" aria-hidden="true">' + fruitArtSVG(spec.fruit) + "</svg>";

            btn.addEventListener("pointerdown", function (e) {
              if (e.button !== 0) return;
              const s = anim.s[i];
              if (btn.setPointerCapture) btn.setPointerCapture(e.pointerId);
              computeBounds(i);
              s.drag = true;
              s.moved = false;
              s.sx = e.clientX;
              s.sy = e.clientY;
              s.ox0 = s.ox;
              s.oy0 = s.oy;
              s.liftT = 1;
              setTopSticker(i);
              wrap.classList.add("is-drag");
              kickPhysics();
            });

            btn.addEventListener("pointermove", function (e) {
              const s = anim.s[i];
              if (!s.drag) return;
              const W = clusterEl.offsetWidth || 1;
              const dx = e.clientX - s.sx;
              const dy = e.clientY - s.sy;
              if (!s.moved && Math.hypot(dx, dy) > 5) s.moved = true;
              if (!s.moved) return;
              s.ox = clampOffset(s.ox0 + dx / W, s.min[0], s.max[0]);
              s.oy = clampOffset(s.oy0 + dy / W, s.min[1], s.max[1]);
              kickPhysics();
            });

            function endDrag(e) {
              const s = anim.s[i];
              if (!s.drag) return;
              s.drag = false;
              s.liftT = 0;
              wrap.classList.remove("is-drag");
              if (e.type === "pointerup") {
                if (s.moved) slapSticker(i);
                else swapStickerFruit(i);
              }
              kickPhysics();
            }

            btn.addEventListener("pointerup", endDrag);
            btn.addEventListener("pointercancel", endDrag);
            btn.addEventListener("click", function (e) {
              if (e.detail === 0) swapStickerFruit(i);
            });
            btn.addEventListener("keydown", function (e) {
              const step = e.shiftKey ? 0.05 : 0.015;
              const map = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
              const m = map[e.key];
              if (!m) return;
              e.preventDefault();
              const s = anim.s[i];
              computeBounds(i);
              s.ox = clampOffset(s.ox + m[0], s.min[0], s.max[0]);
              s.oy = clampOffset(s.oy + m[1], s.min[1], s.max[1]);
              setTopSticker(i);
              kickPhysics();
            });

            bobDiv.appendChild(btn);
            inDiv.appendChild(bobDiv);
            wrap.appendChild(inDiv);

            stickerEls[i] = wrap;
            bodyEls[i] = btn;

            if (spec.behind && headEl) clusterEl.insertBefore(wrap, headEl);
            else clusterEl.appendChild(wrap);
          });
        }

        heroRoot.addEventListener("pointermove", function (e) {
          if (e.pointerType !== "mouse") return;
          const r = heroRoot.getBoundingClientRect();
          anim.tpx = ((e.clientX - r.left) / r.width) * 2 - 1;
          anim.tpy = ((e.clientY - r.top) / r.height) * 2 - 1;
          kickPhysics();
        });

        heroRoot.addEventListener("pointerleave", function () {
          anim.tpx = 0;
          anim.tpy = 0;
          kickPhysics();
        });

        stageEl.addEventListener("mousedown", function (e) {
          if (e.detail > 1 && !e.target.closest("button,a")) e.preventDefault();
        });

        stageEl.addEventListener("dblclick", function (e) {
          if (e.target.closest("button,a")) return;
          anim.s.forEach(function (s) {
            s.ox = 0;
            s.oy = 0;
          });
          kickPhysics();
        });

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.addEventListener) {
          mq.addEventListener("change", function () {
            anim.reduced = mq.matches;
            kickPhysics();
          });
        }

        if (typeof ResizeObserver !== "undefined") {
          const ro = new ResizeObserver(kickPhysics);
          ro.observe(clusterEl);
        } else {
          window.addEventListener("resize", kickPhysics, { passive: true });
        }

        renderScriptWord();
        buildStickersDom();
        requestAnimationFrame(function () {
          heroRoot.setAttribute("data-in", "");
          kickPhysics();
        });
      }

      /* ------------------------------------------------------------------------
         C. CUSTOM HAND-DRAWN INGREDIENT SVGS & RECIPE DATABASE (1 Person Base)
         ------------------------------------------------------------------------ */
      const INGREDIENT_SVGS = {
        egg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C8.5 3 5.5 9.2 5.5 14C5.5 17.9 8.4 21 12 21C15.6 21 18.5 17.9 18.5 14C18.5 9.2 15.5 3 12 3Z"/><path d="M9.5 12.5C9.2 14.5 9.8 16.2 11 17"/></svg>',
        flour: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10L7 20H17L19 10H5Z"/><path d="M7.5 10C8 6.8 9.8 5 12 5C14.2 5 16 6.8 16.5 10"/><path d="M9.5 14.5H14.5"/></svg>',
        oil: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5C12 3.5 6.5 10.2 6.5 14.5C6.5 17.8 9 20.5 12 20.5C15 20.5 17.5 17.8 17.5 14.5C17.5 10.2 12 3.5 12 3.5Z"/><path d="M10 15.5C10 16.8 10.9 17.8 12.2 17.8"/></svg>',
        sugar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="7" height="7" rx="1.5"/><rect x="12.5" y="10.5" width="7" height="7" rx="1.5"/><rect x="8.5" y="4.5" width="7" height="7" rx="1.5"/></svg>',
        cheese: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11L13.5 5L20 11V18.5H4V11Z"/><circle cx="9.5" cy="14.5" r="1.2"/><circle cx="15" cy="15" r="1.5"/><circle cx="13" cy="11.5" r="1"/></svg>',
        spoon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="15.5" cy="8.5" rx="3.5" ry="4.5" transform="rotate(42 15.5 8.5)"/><path d="M12.5 11.5L5 19"/></svg>',
        vanilla: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4V20"/><path d="M6 12C6 8.5 8.7 6 12 6C15.3 6 18 8.5 18 12"/><path d="M8 17C9.5 15.5 14.5 15.5 16 17"/></svg>',
        salt: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 10L9 19.5H15L16.5 10H7.5Z"/><path d="M8.5 10C8.5 7.2 10 5.5 12 5.5C14 5.5 15.5 7.2 15.5 10"/><circle cx="10.5" cy="14" r="0.6" fill="currentColor"/><circle cx="13.5" cy="15.5" r="0.6" fill="currentColor"/></svg>',
        dough: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15.5C4 10.5 7.5 6.5 12 6.5C16.5 6.5 20 10.5 20 15.5C20 17.5 18.5 18.5 16.5 18.5H7.5C5.5 18.5 4 17.5 4 15.5Z"/><path d="M9.5 9.5L11 12.5M14.5 9.5L13 12.5"/></svg>',
        tomato: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.5" r="6.8"/><path d="M12 6.5V3.8M9 7.2L12 6.5L15 7.2M10.2 5.2L12 6.5L13.8 5.2"/></svg>',
        garlic: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4C12 7 7 9.5 6.5 14.5C6.2 17.6 8.6 20 12 20C15.4 20 17.8 17.6 17.5 14.5C17 9.5 12 7 12 4Z"/><path d="M12 7.5V19.8"/></svg>',
        basil: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18C6 10.5 11.5 5.5 19 5C18.5 12.5 13.5 18 6 18Z"/><path d="M6 18L15 9"/></svg>'
      };

      const RECIPES = {
        cake: {
          id: "cake",
          title: "Olive Oil & Mascarpone Cake",
          description: "Tender single-layer sponge with pasture-raised eggs, sifted flour, cold-pressed olive oil, and whipped mascarpone.",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85",
          fallbackImage: "https://picsum.photos/seed/artisancake/1000/650",
          baseMassGrams: 380,
          ingredients: [
            { icon: "egg", amount: 2, unitSingular: "egg", unitPlural: "eggs", item: "" },
            { icon: "flour", amount: 1, unitSingular: "cup", unitPlural: "cups", item: "flour" },
            { icon: "oil", amount: 0.5, unitSingular: "cup", unitPlural: "cups", item: "olive oil" },
            { icon: "sugar", amount: 0.75, unitSingular: "cup", unitPlural: "cups", item: "cane sugar" },
            { icon: "cheese", amount: 4, unitSingular: "oz", unitPlural: "oz", item: "mascarpone" },
            { icon: "spoon", amount: 1.5, unitSingular: "tsp", unitPlural: "tsp", item: "baking powder" },
            { icon: "vanilla", amount: 1, unitSingular: "tsp", unitPlural: "tsp", item: "vanilla paste" },
            { icon: "salt", amount: 0.25, unitSingular: "tsp", unitPlural: "tsp", item: "sea salt" }
          ],
          steps: [
            { verb: "Whisk", template: "Beat {0} and {3} for 4 minutes until pale and airy." },
            { verb: "Stream", template: "Whisk in {2} and {6} until glossy and emulsified." },
            { verb: "Bake", template: "Fold in {1}, {5}, and {7}, finish with {4}, and bake at 350°F for 28 min." }
          ]
        },
        pizza: {
          id: "pizza",
          title: "San Marzano & Burrata Pizza",
          description: "Blistered 24-hour sourdough crust topped with hand-crushed tomatoes, creamy burrata, shaved garlic, and fresh basil.",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85",
          fallbackImage: "https://picsum.photos/seed/artisanpizza/1000/650",
          baseMassGrams: 440,
          ingredients: [
            { icon: "dough", amount: 1, unitSingular: "dough ball", unitPlural: "dough balls", item: "" },
            { icon: "tomato", amount: 0.5, unitSingular: "cup", unitPlural: "cups", item: "crushed tomatoes" },
            { icon: "cheese", amount: 4, unitSingular: "oz", unitPlural: "oz", item: "fresh burrata" },
            { icon: "oil", amount: 2, unitSingular: "tbsp", unitPlural: "tbsp", item: "olive oil" },
            { icon: "garlic", amount: 3, unitSingular: "garlic clove", unitPlural: "garlic cloves", item: "" },
            { icon: "basil", amount: 6, unitSingular: "basil leaf", unitPlural: "basil leaves", item: "" },
            { icon: "spoon", amount: 1, unitSingular: "tsp", unitPlural: "tsp", item: "grated pecorino" },
            { icon: "salt", amount: 0.5, unitSingular: "tsp", unitPlural: "tsp", item: "flaky sea salt" }
          ],
          steps: [
            { verb: "Stretch", template: "Press {0} gently onto a floured peel leaving a puffy rim." },
            { verb: "Top", template: "Spoon on {1}, scatter {4} and {6}, then drizzle {3}." },
            { verb: "Char", template: "Bake at 550°F for 6 min, then finish with {2}, {5}, and {7}." }
          ]
        }
      };

      const state = {
        currentView: "menu",
        activeMealId: "cake",
        multiplier: 1,
        checkedIndices: new Set()
      };

      /* ------------------------------------------------------------------------
         D. DOM REFERENCES & RECIPE SCALING ENGINE
         ------------------------------------------------------------------------ */
      const viewMenu = document.getElementById("view-menu");
      const viewRecipe = document.getElementById("view-recipe");
      const navBtnMenu = document.getElementById("nav-btn-menu");
      const navBtnRecipe = document.getElementById("nav-btn-recipe");
      const mobileNavMenu = document.getElementById("mobile-nav-menu");
      const mobileNavRecipe = document.getElementById("mobile-nav-recipe");
      const navBrandLink = document.getElementById("nav-brand-link");
      const backToMenuBtn = document.getElementById("back-to-menu-btn");

      const hamburgerOpenBtn = document.getElementById("hamburger-open-btn");
      const hamburgerCloseBtn = document.getElementById("hamburger-close-btn");
      const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");

      const mealCards = document.querySelectorAll(".meal-card");
      const switcherBtns = document.querySelectorAll("[data-switch-meal]");
      const quickMealTriggers = document.querySelectorAll("[data-open-meal]");

      const recipeDishImage = document.getElementById("recipe-dish-image");
      const recipeDishTitle = document.getElementById("recipe-dish-title");
      const recipeDishDesc = document.getElementById("recipe-dish-desc");
      const telemetryServings = document.getElementById("telemetry-servings");
      const telemetryMultiplier = document.getElementById("telemetry-multiplier");
      const telemetryMass = document.getElementById("telemetry-mass");
      const ingredientsHeading = document.getElementById("ingredients-heading");
      const multiplierStatusLine = document.getElementById("multiplier-status-line");
      const ingredientsListContainer = document.getElementById("ingredients-list-container");
      const stepsListContainer = document.getElementById("steps-list-container");

      const doubleRecipeBtn = document.getElementById("double-recipe-btn");
      const resetRecipeBtn = document.getElementById("reset-recipe-btn");
      const toastNotification = document.getElementById("toast-notification");
      const themeToggleBtn = document.getElementById("theme-toggle-btn");
      const themeIconSvg = document.getElementById("theme-icon-svg");
      const metaThemeColor = document.getElementById("meta-theme-color");

      let toastTimer = null;
      const MAX_MULTIPLIER = 1024;

      function formatNumber(val) {
        const rounded = Math.round(val * 100) / 100;
        if (rounded >= 1000) {
          return rounded.toLocaleString("en-US", { maximumFractionDigits: 2 });
        }
        return String(rounded);
      }

      function formatIngredient(ing, mult) {
        const val = ing.amount * mult;
        const numStr = formatNumber(val);
        const unit = val === 1 ? ing.unitSingular : ing.unitPlural;
        const tail = ing.item ? " " + ing.item : "";
        return {
          numStr: numStr,
          restStr: " " + unit + tail,
          fullText: numStr + " " + unit + tail
        };
      }

      function renderRecipeContent(animateMorph) {
        const recipe = RECIPES[state.activeMealId];
        const mult = state.multiplier;

        switcherBtns.forEach(function (btn) {
          btn.classList.toggle("active", btn.getAttribute("data-switch-meal") === state.activeMealId);
        });

        recipeDishTitle.textContent = recipe.title;
        recipeDishDesc.textContent = recipe.description;
        if (recipeDishImage.getAttribute("src") !== recipe.image) {
          recipeDishImage.src = recipe.image;
          recipeDishImage.onerror = function () {
            this.onerror = null;
            this.src = recipe.fallbackImage;
          };
        }

        const personLabel = mult === 1 ? "1 Person" : formatNumber(mult) + " People";
        ingredientsHeading.textContent = "Ingredients for " + personLabel;
        multiplierStatusLine.textContent =
          mult === 1
            ? "Tap Double Recipe to multiply all numbers by 2"
            : mult >= MAX_MULTIPLIER
              ? "Max " + formatNumber(MAX_MULTIPLIER) + "x batch reached. Tap Reset (1x) to start over."
              : "Scaled " + formatNumber(mult) + "x. Tap again to double to " + formatNumber(mult * 2) + "x";

        if (animateMorph) {
          [telemetryServings, telemetryMultiplier, telemetryMass].forEach(function (el) {
            el.classList.add("is-morphing");
          });
          setTimeout(function () {
            telemetryServings.textContent = personLabel;
            telemetryMultiplier.textContent = formatNumber(mult) + "x";
            telemetryMass.textContent = formatNumber(recipe.baseMassGrams * mult) + " g";
            [telemetryServings, telemetryMultiplier, telemetryMass].forEach(function (el) {
              el.classList.remove("is-morphing");
            });
          }, 130);
        } else {
          telemetryServings.textContent = personLabel;
          telemetryMultiplier.textContent = formatNumber(mult) + "x";
          telemetryMass.textContent = formatNumber(recipe.baseMassGrams * mult) + " g";
        }

        const existingCards = ingredientsListContainer.querySelectorAll(".ingredient-card");
        if (animateMorph && existingCards.length === recipe.ingredients.length) {
          existingCards.forEach(function (card, index) {
            const line = card.querySelector(".ingredient-primary-line");
            const formatted = formatIngredient(recipe.ingredients[index], mult);
            setTimeout(function () {
              line.classList.add("is-morphing");
              card.classList.add("is-pulsing");
              setTimeout(function () {
                line.innerHTML = '<span class="ing-num">' + formatted.numStr + "</span>" + formatted.restStr;
                line.classList.remove("is-morphing");
              }, 140);
              setTimeout(function () {
                card.classList.remove("is-pulsing");
              }, 380);
            }, index * 32);
          });
        } else {
          ingredientsListContainer.innerHTML = "";
          recipe.ingredients.forEach(function (ing, index) {
            const formatted = formatIngredient(ing, mult);
            const checked = state.checkedIndices.has(index);
            const card = document.createElement("div");
            card.className = "ingredient-card" + (checked ? " is-checked" : "");
            card.setAttribute("role", "checkbox");
            card.setAttribute("aria-checked", checked ? "true" : "false");
            card.setAttribute("tabindex", "0");

            card.innerHTML =
              '<span class="ing-svg-vessel" aria-hidden="true">' + (INGREDIENT_SVGS[ing.icon] || INGREDIENT_SVGS.spoon) + "</span>" +
              '<div class="ing-text-col">' +
              '  <div class="ingredient-primary-line"><span class="ing-num">' + formatted.numStr + "</span>" + formatted.restStr + "</div>" +
              "</div>" +
              '<span class="ing-check" aria-hidden="true">' +
              '  <svg width="12" height="12" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"><polyline points="216 72 104 184 48 128"></polyline></svg>' +
              "</span>";

            function toggleCard() {
              if (state.checkedIndices.has(index)) {
                state.checkedIndices.delete(index);
                card.classList.remove("is-checked");
                card.setAttribute("aria-checked", "false");
              } else {
                state.checkedIndices.add(index);
                card.classList.add("is-checked");
                card.setAttribute("aria-checked", "true");
              }
            }

            card.addEventListener("click", toggleCard);
            card.addEventListener("keydown", function (e) {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleCard();
              }
            });

            ingredientsListContainer.appendChild(card);
          });
        }

        // Render Preparation Steps with Live Doubled Quantities
        const formattedTexts = recipe.ingredients.map(function (ing) {
          return formatIngredient(ing, mult).fullText;
        });

        stepsListContainer.innerHTML = recipe.steps.map(function (step) {
          const text = step.template.replace(/\{(\d+)\}/g, function (_, idx) {
            return "<strong>" + (formattedTexts[Number(idx)] || "") + "</strong>";
          });
          return '<div class="step-row"><span class="step-badge">' + step.verb + '</span><p class="step-copy">' + text + "</p></div>";
        }).join("");
      }

      function handleDoubleRecipe() {
        if (state.multiplier >= MAX_MULTIPLIER) {
          showToast("Max " + formatNumber(MAX_MULTIPLIER) + "x batch reached. Tap Reset (1x)");
          return;
        }
        state.multiplier = state.multiplier * 2;
        renderRecipeContent(true);
        showToast("Doubled to " + formatNumber(state.multiplier) + "x (" + formatNumber(state.multiplier) + " People)!");
      }

      function handleResetRecipe() {
        if (state.multiplier === 1) {
          showToast("Already at 1 Person base (1x)");
          return;
        }
        state.multiplier = 1;
        renderRecipeContent(true);
        showToast("Reset to 1 Person base (1x)");
      }

      /* ------------------------------------------------------------------------
         E. VIEW NAVIGATION (Page 1 Menu <-> Page 2 Recipe)
         ------------------------------------------------------------------------ */
      function syncNavActive(targetView) {
        const isMenu = targetView === "menu";
        if (navBtnMenu) {
          navBtnMenu.classList.toggle("active", isMenu);
          navBtnMenu.setAttribute("aria-selected", String(isMenu));
        }
        if (navBtnRecipe) {
          navBtnRecipe.classList.toggle("active", !isMenu);
          navBtnRecipe.setAttribute("aria-selected", String(!isMenu));
        }
        if (mobileNavMenu) mobileNavMenu.classList.toggle("active", isMenu);
        if (mobileNavRecipe) mobileNavRecipe.classList.toggle("active", !isMenu);
      }

      function navigateToView(targetView, optionalMealId) {
        closeMobileDrawer();

        if (optionalMealId && RECIPES[optionalMealId]) {
          if (state.activeMealId !== optionalMealId) {
            state.activeMealId = optionalMealId;
            state.multiplier = 1;
            state.checkedIndices.clear();
          }
        }

        if (targetView === "recipe") {
          renderRecipeContent(false);
        }

        if (state.currentView === targetView) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        state.currentView = targetView;
        syncNavActive(targetView);

        const outgoing = targetView === "recipe" ? viewMenu : viewRecipe;
        const incoming = targetView === "recipe" ? viewRecipe : viewMenu;

        outgoing.classList.remove("is-active");
        setTimeout(function () {
          outgoing.classList.remove("is-visible");
          incoming.classList.add("is-visible");
          window.scrollTo(0, 0);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              incoming.classList.add("is-active");
            });
          });
        }, 200);
      }

      /* ------------------------------------------------------------------------
         F. MOBILE HAMBURGER DRAWER, TOAST NOTIFICATIONS & THEME TOGGLE
         ------------------------------------------------------------------------ */
      function openMobileDrawer() {
        if (!mobileDrawerOverlay || !hamburgerOpenBtn) return;
        mobileDrawerOverlay.classList.add("is-open");
        hamburgerOpenBtn.classList.add("is-open");
        hamburgerOpenBtn.setAttribute("aria-expanded", "true");
        document.body.classList.add("drawer-open");
      }

      function closeMobileDrawer() {
        if (!mobileDrawerOverlay || !hamburgerOpenBtn) return;
        mobileDrawerOverlay.classList.remove("is-open");
        hamburgerOpenBtn.classList.remove("is-open");
        hamburgerOpenBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("drawer-open");
      }

      if (hamburgerOpenBtn) {
        hamburgerOpenBtn.addEventListener("click", function () {
          if (mobileDrawerOverlay && mobileDrawerOverlay.classList.contains("is-open")) {
            closeMobileDrawer();
          } else {
            openMobileDrawer();
          }
        });
      }

      if (hamburgerCloseBtn) {
        hamburgerCloseBtn.addEventListener("click", closeMobileDrawer);
      }

      if (mobileDrawerOverlay) {
        mobileDrawerOverlay.addEventListener("click", function (e) {
          if (e.target === mobileDrawerOverlay) {
            closeMobileDrawer();
          }
        });
      }

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mobileDrawerOverlay && mobileDrawerOverlay.classList.contains("is-open")) {
          closeMobileDrawer();
        }
      });

      function showToast(message) {
        if (!toastNotification) return;
        toastNotification.textContent = message;
        toastNotification.classList.add("is-open");
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
          toastNotification.classList.remove("is-open");
        }, 2400);
      }

      const ICON_MOON = '<path d="M216.7 152.6A91.9 91.9 0 0 1 103.4 39.3a92 92 0 1 0 113.3 113.3Z"></path>';
      const ICON_SUN = '<circle cx="128" cy="128" r="56"></circle><line x1="128" y1="36" x2="128" y2="16"></line><line x1="128" y1="240" x2="128" y2="220"></line><line x1="63" y1="63" x2="49" y2="49"></line><line x1="207" y1="207" x2="193" y2="193"></line><line x1="36" y1="128" x2="16" y2="128"></line><line x1="240" y1="128" x2="220" y2="128"></line><line x1="63" y1="193" x2="49" y2="207"></line><line x1="207" y1="49" x2="193" y2="63"></line>';

      function applyTheme(theme, persist) {
        const nextTheme = theme === "dark" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", nextTheme);
        if (metaThemeColor) {
          metaThemeColor.setAttribute("content", nextTheme === "dark" ? "#111510" : "#EEF3E2");
        }
        if (themeIconSvg) {
          themeIconSvg.innerHTML = nextTheme === "dark" ? ICON_SUN : ICON_MOON;
        }
        if (persist) {
          try {
            window.localStorage.setItem("doublet-theme", nextTheme);
          } catch (_) {
            // Ignore storage restrictions inside sandboxed previews
          }
        }
      }

      function initTheme() {
        let saved = null;
        try {
          saved = window.localStorage.getItem("doublet-theme");
        } catch (_) {
          saved = null;
        }
        if (saved === "dark" || saved === "light") {
          applyTheme(saved, false);
        } else {
          applyTheme("light", false);
        }
      }

      if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
          const current = document.documentElement.getAttribute("data-theme") || "light";
          const next = current === "dark" ? "light" : "dark";
          applyTheme(next, true);
          showToast("Switched to " + next + " mode");
        });
      }

      /* ------------------------------------------------------------------------
         G. SUBTLE HOVER & TAP EASTER EGG ON "MACHANI SRI BALAJI"
         ------------------------------------------------------------------------ */
      function initNameEasterEgg() {
        const card = document.getElementById("easter-egg-card");
        const nameEl = document.getElementById("easter-egg-name");
        if (!card || !nameEl) return;

        const rawText = nameEl.getAttribute("data-text") || nameEl.textContent || "";
        nameEl.setAttribute("aria-label", rawText);
        nameEl.innerHTML = Array.from(rawText).map(function (ch, idx) {
          return '<span class="ee-char" style="--ci:' + idx + '" aria-hidden="true">' + (ch === " " ? "&nbsp;" : ch) + "</span>";
        }).join("");

        let tapResetTimer = null;

        // Allow touch devices to briefly trigger the same subtle grain + text blur wave
        card.addEventListener("click", function () {
          card.classList.remove("is-egg-active");
          void card.offsetWidth;
          card.classList.add("is-egg-active");
          if (tapResetTimer) clearTimeout(tapResetTimer);
          tapResetTimer = setTimeout(function () {
            card.classList.remove("is-egg-active");
          }, 950);
        });
      }

      /* ------------------------------------------------------------------------
         H. EVENT BINDINGS & INITIALIZATION
         ------------------------------------------------------------------------ */
      mealCards.forEach(function (card) {
        const mealId = card.getAttribute("data-meal-id");
        card.addEventListener("click", function () {
          navigateToView("recipe", mealId);
        });
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigateToView("recipe", mealId);
          }
        });
      });

      quickMealTriggers.forEach(function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          navigateToView("recipe", el.getAttribute("data-open-meal"));
        });
      });

      switcherBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          const mealId = btn.getAttribute("data-switch-meal");
          if (mealId && mealId !== state.activeMealId) {
            state.activeMealId = mealId;
            state.multiplier = 1;
            state.checkedIndices.clear();
            renderRecipeContent(false);
            showToast("Loaded " + RECIPES[mealId].title + " (1 Person)");
          }
        });
      });

      if (doubleRecipeBtn) doubleRecipeBtn.addEventListener("click", handleDoubleRecipe);
      if (resetRecipeBtn) resetRecipeBtn.addEventListener("click", handleResetRecipe);
      if (navBtnMenu) navBtnMenu.addEventListener("click", function () { navigateToView("menu"); });
      if (navBtnRecipe) navBtnRecipe.addEventListener("click", function () { navigateToView("recipe"); });
      if (mobileNavMenu) mobileNavMenu.addEventListener("click", function () { navigateToView("menu"); });
      if (mobileNavRecipe) mobileNavRecipe.addEventListener("click", function () { navigateToView("recipe"); });
      if (backToMenuBtn) backToMenuBtn.addEventListener("click", function () { navigateToView("menu"); });
      if (navBrandLink) {
        navBrandLink.addEventListener("click", function (e) {
          e.preventDefault();
          navigateToView("menu");
        });
      }

      // Initialize all interactive modules
      initTheme();
      initFruitStickerHero();
      initNameEasterEgg();
      renderRecipeContent(false);
    })();
  