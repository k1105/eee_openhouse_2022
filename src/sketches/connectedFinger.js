export const connectedFinger = (p5, hands) => {
  for (let index = 0; index < hands.length; index++) {
    const keys = hands[index];
    p5.push();

    p5.translate(window.innerWidth / 2, 800);
    for (let i = 1; i < 4; i++) {
      //thumb
      p5.line(
        3 * (keys[i].x - keys[0].x),
        3 * (keys[i].y - keys[0].y),
        3 * (keys[i + 1].x - keys[0].x),
        3 * (keys[i + 1].y - keys[0].y)
      );
    }

    p5.translate(3 * (keys[4].x - keys[0].x), 3 * (keys[4].y - keys[0].y));
    p5.rotate(
      p5.PI / 2 + p5.atan2(keys[4].y - keys[3].y, keys[4].x - keys[3].x)
    );
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
    p5.rotate(
      p5.PI / 2 + p5.atan2(keys[8].y - keys[7].y, keys[8].x - keys[7].x)
    );
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
    p5.rotate(
      p5.PI / 2 + p5.atan2(keys[12].y - keys[11].y, keys[12].x - keys[11].x)
    );
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
    p5.rotate(
      p5.PI / 2 + p5.atan2(keys[16].y - keys[15].y, keys[16].x - keys[15].x)
    );
    for (let i = 17; i < 20; i++) {
      //pinky
      p5.line(
        3 * (keys[i].x - keys[17].x),
        3 * (keys[i].y - keys[17].y),
        3 * (keys[i + 1].x - keys[17].x),
        3 * (keys[i + 1].y - keys[17].y)
      );
    }
    p5.pop();
  }
};
