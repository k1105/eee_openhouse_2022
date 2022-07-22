import { ReactP5Wrapper } from "react-p5-wrapper";

export const IndexFinger = ({ predictionsRef }) => {
  function sketch(p5) {
    const begin_at = [];
    for (let i = 0; i < 100; i++) {
      begin_at.push([
        p5.random() * window.innerWidth,
        p5.random() * window.innerHeight,
        p5.random() * p5.PI * 2,
      ]);
    }

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.strokeWeight(10);
    };

    p5.draw = () => {
      p5.background(250);
      if (typeof predictionsRef.current == "object") {
        try {
          for (let k = 0; k < 100; k++) {
            p5.push();
            p5.translate(begin_at[k][0], begin_at[k][1]);
            p5.rotate(begin_at[k][2]);
            const keys = predictionsRef.current[0].keypoints;

            const base_x = keys[0].x;
            const base_y = keys[0].y;
            for (let i = 1; i < 4; i++) {
              //thumb
              p5.line(
                3 * (keys[i].x - base_x),
                3 * (keys[i].y - base_y),
                3 * (keys[i + 1].x - base_x),
                3 * (keys[i + 1].y - base_y)
              );
            }

            p5.pop();
          }
        } catch (e) {}
      }
    };
  }
  return <ReactP5Wrapper sketch={sketch} />;
};
