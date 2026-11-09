/**
 * Static gold line and point network behind the Home hero (decision 268). It is decorative, so it
 * does not move: the motion rules say motion never decorates. It is inline SVG drawn on the
 * server from a fixed seed, so it costs no JavaScript or WebGL, looks the same on every device,
 * and cannot become the Largest Contentful Paint element. A mask keeps it away from the text.
 */

const W = 1440;
const H = 720;
const POINTS = 96; // well under the 1,000-point limit
const LINK = 150; // join points closer than this
const MAX_LINKS = 3;

// mulberry32: a small seeded generator, so the pattern is identical on every build.
function random(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build() {
  const r = random(26268001);
  // Denser towards the right, where the model sits.
  const pts = Array.from({ length: POINTS }, () => [Math.round(W * (1 - Math.pow(r(), 1.6))), Math.round(H * r())] as const);
  const links = new Map<number, number>();
  const lines: string[] = [];
  pts.forEach(([x1, y1], i) => {
    pts
      .map(([x2, y2], j) => ({ j, d: Math.hypot(x2 - x1, y2 - y1) }))
      .filter(({ j, d }) => j > i && d < LINK)
      .sort((a, b) => a.d - b.d)
      .forEach(({ j }) => {
        if ((links.get(i) ?? 0) >= MAX_LINKS || (links.get(j) ?? 0) >= MAX_LINKS) return;
        links.set(i, (links.get(i) ?? 0) + 1);
        links.set(j, (links.get(j) ?? 0) + 1);
        const [x2, y2] = pts[j] ?? [0, 0];
        lines.push(`M${x1} ${y1}L${x2} ${y2}`);
      });
  });
  // A zero-length segment with round caps draws a dot, so all points fit in one path.
  const dots = pts.map(([x, y]) => `M${x} ${y}h0`).join("");
  return { lines: lines.join(""), dots };
}

const { lines, dots } = build();

export function HeroNetwork() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full text-gold-500 [mask-image:linear-gradient(to_bottom,transparent_35%,black_85%)] lg:[mask-image:linear-gradient(to_right,transparent_30%,black_75%)]"
    >
      <path d={lines} fill="none" stroke="currentColor" strokeWidth={1} strokeOpacity={0.14} vectorEffect="non-scaling-stroke" />
      <path d={dots} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeOpacity={0.3} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
