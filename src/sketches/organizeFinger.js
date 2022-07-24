export const organizeFinger = (p5, hands) => {
  // --
  // <> pinky
  // <> ring
  // <> middle
  // <> index
  // <> thumb
  // --
  // if one hand is detected, both side of organ is shrink / extend.
  // if two hands are detected, each side of organ changes according to each hand.
  const r = 50;
  const offset = 30;
  const fingerNames = [
    "thumb",
    "index finger",
    "middle finger",
    "ring finger",
    "pinky",
  ];
  let start;
  let end;

  if (hands.length === 1) {
    hands.push(hands[0]);
  }

  for (let index = 0; index < 2; index++) {
    const keys = hands[index];

    p5.push();
    p5.translate(0, window.innerHeight / 2);

    for (let n = 0; n < 5; n++) {
      if (n === 0) {
        start = 2;
      } else {
        start = 4 * n + 1;
      }
      end = 4 * n + 4;
      p5.push();
      p5.translate((window.innerWidth / 6) * (n + 1), 0);

      p5.push();
      const d = keys[end].y - keys[start].y;
      if (index === 1) {
        if (r < p5.abs(d)) {
          p5.line(offset, 0, offset, -3 * r);
        } else if (d > 0) {
          p5.line(offset, 0, (3 * r) / 2, 0);
        } else {
          p5.line(offset, 0, offset + p5.sqrt(r ** 2 - d ** 2), (3 * d) / 2);
          p5.line(
            offset + p5.sqrt(r ** 2 - d ** 2),
            (3 * d) / 2,
            offset,
            3 * d
          );
        }
      } else if (d > 0) {
        p5.line(-offset, 0, -(3 * r) / 2, 0);
      } else {
        if (r < p5.abs(d)) {
          p5.line(-offset, 0, -offset, -3 * r);
        } else {
          p5.line(-offset, 0, -offset - p5.sqrt(r ** 2 - d ** 2), (3 * d) / 2);
          p5.line(
            -offset - p5.sqrt(r ** 2 - d ** 2),
            (3 * d) / 2,
            -offset,
            3 * d
          );
        }
      }

      p5.push();
      p5.translate(0, 200);
      p5.noStroke();
      p5.textAlign(p5.CENTER);
      p5.textSize(25);
      p5.text(fingerNames[n], 0, 0);
      p5.pop();

      p5.pop();
      p5.pop();
    }

    p5.pop();
  }
};
