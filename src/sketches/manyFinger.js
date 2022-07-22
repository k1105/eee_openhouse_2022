export const manyFinger = (p5, hands) => {
  for (let index = 0; index < hands.length; index++) {
    const keys = hands[index];
    const fingerNames = [
      "thumb",
      "index finger",
      "middle finger",
      "ring finger",
      "pinky",
    ];
    let start;
    let end;
    start = 1;
    end = 4;
    const init = 1000;
    p5.noiseSeed(0);
    p5.push();
    p5.translate(p5.width * 0.75, p5.height * 0.9);
    for (let n = 0; n < 300; n++) {
      p5.rotate(p5.TWO_PI * p5.noise(n / 100 + init));
      p5.translate(
        p5.width * p5.noise(n / 100 + init),
        p5.height * p5.noise(n / 100 + init)
      );
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

    p5.push();
    p5.textSize(25);
    p5.noStroke();
    p5.translate(70, 100);
    p5.text(fingerNames[0], 0, 0);
    for (let i = 0; i < 10; i++) {
      p5.translate(0, 100);
      p5.text(fingerNames[0], 0, 0);
    }
    p5.pop();
  }
};
