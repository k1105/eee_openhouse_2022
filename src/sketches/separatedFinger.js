export const separatedFinger = (p5, hands) => {
  for (let index = 0; index < hands.length; index++) {
    const keys = hands[index];
    p5.push();
    const base_x = keys[0].x;
    const base_y = keys[0].y;

    p5.translate(window.innerWidth / 2, 800);
    for (let i = 1; i < 4; i++) {
      //thumb
      p5.line(
        3 * (keys[i].x - base_x),
        3 * (keys[i].y - base_y),
        3 * (keys[i + 1].x - base_x),
        3 * (keys[i + 1].y - base_y)
      );
    }

    p5.translate(3 * (keys[4].x - base_x), 3 * (keys[4].y - base_y));
    p5.rotate(
      p5.PI / 2 + p5.atan2(keys[4].y - keys[3].y, keys[4].x - keys[3].x)
    );

    let start;
    let end;
    for (let n = 0; n < 4; n++) {
      start = 4 * n + 5;
      end = 4 * n + 8;

      for (let i = start; i < end; i++) {
        p5.line(
          3 * (keys[i].x - keys[start].x),
          3 * (keys[i].y - keys[start].y),
          3 * (keys[i + 1].x - keys[start].x),
          3 * (keys[i + 1].y - keys[start].y)
        );
      }
    }

    p5.pop();
  }
};
