export const indicateCircle = (p5, hands) => {
  const keys = hands[0];
  p5.push();
  const base_x = keys[0].x;
  const base_y = keys[0].y;

  p5.translate(window.innerWidth / 2, 800);
  for (let i = 1; i < 20; i++) {
    if (i % 4 !== 0) {
      p5.line(
        3 * (keys[i].x - base_x),
        3 * (keys[i].y - base_y),
        3 * (keys[i + 1].x - base_x),
        3 * (keys[i + 1].y - base_y)
      );
    }
  }

  p5.push();
  p5.fill(57, 127, 173);
  p5.noStroke();
  p5.ellipse(3 * (keys[8].x - base_x), -300, 30);
  p5.pop();
  p5.pop();
};
