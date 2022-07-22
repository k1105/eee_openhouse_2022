export const drawInterporatedEllipse = (p5, pos0, pos1, r0, r1, num) => {
  for (let t = 0; t < num; t++) {
    const x = ((pos1.x - pos0.x) / num) * t + pos0.x;
    const y = ((pos1.y - pos0.y) / num) * t + pos0.y;
    const r = ((r1 - r0) / num) * t + r0;
    p5.ellipse(x, y, r);
  }
};
