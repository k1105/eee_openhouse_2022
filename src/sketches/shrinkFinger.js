export const shrinkFinger = (p5, hands) => {
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
    p5.push();
    p5.translate(3 * (keys[4].x - base_x), 3 * (keys[4].y - base_y));
    for (let i = 5; i < 8; i++) {
      //index finger
      p5.line(
        3 * (keys[i].x - keys[5].x),
        3 * (keys[i].y - keys[5].y),
        3 * (keys[i + 1].x - keys[5].x),
        3 * (keys[i + 1].y - keys[5].y)
      );
    }
    p5.translate(3 * (keys[8].x - keys[5].x), 3 * (keys[8].y - keys[5].y));
    for (let i = 9; i < 12; i++) {
      //middle finger
      p5.line(
        3 * (keys[i].x - keys[9].x),
        3 * (keys[i].y - keys[9].y),
        3 * (keys[i + 1].x - keys[9].x),
        3 * (keys[i + 1].y - keys[9].y)
      );
    }
    p5.translate(3 * (keys[12].x - keys[9].x), 3 * (keys[12].y - keys[9].y));
    for (let i = 13; i < 16; i++) {
      //ring finger
      p5.line(
        3 * (keys[i].x - keys[13].x),
        3 * (keys[i].y - keys[13].y),
        3 * (keys[i + 1].x - keys[13].x),
        3 * (keys[i + 1].y - keys[13].y)
      );
    }
    p5.translate(3 * (keys[16].x - keys[13].x), 3 * (keys[16].y - keys[13].y));
    for (let i = 13; i < 16; i++) {
      //ring finger
      p5.line(
        3 * (keys[i].x - keys[16].x),
        3 * (keys[i].y - keys[16].y),
        3 * (keys[i + 1].x - keys[16].x),
        3 * (keys[i + 1].y - keys[16].y)
      );
    }
    p5.pop();
    p5.pop();
  }
};
