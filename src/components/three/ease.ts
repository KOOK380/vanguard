import { MathUtils } from "three";

/** cubic-bezier(.4, 0, .2, 1), the camera easing token, solved for y at a given x. */
export function cameraEase(x: number) {
  const [x1, y1, x2, y2] = [0.4, 0, 0.2, 1];
  const bez = (t: number, a: number, b: number) => 3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  let t = x;
  for (let i = 0; i < 8; i++) {
    const dx = bez(t, x1, x2) - x;
    const d = 3 * x1 * (1 - t) ** 2 + 6 * (x2 - x1) * t * (1 - t) + 3 * (1 - x2) * t ** 2;
    if (Math.abs(dx) < 1e-5 || d === 0) break;
    t = MathUtils.clamp(t - dx / d, 0, 1);
  }
  return bez(t, y1, y2);
}
