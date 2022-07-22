import { ReactP5Wrapper } from "react-p5-wrapper";
import { drawInterporatedEllipse } from "../lib/drawInterporatedEllipse";
import { rigmap } from "../lib/rigmap";

export const DrawTail = ({ predictionsRef }) => {
  const hip_r = 130;
  const tail_r = [73.4, 42.7, 24.3, 12.7];
  function sketch(p5) {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.noStroke();
      p5.fill(0);
    };

    p5.draw = () => {
      p5.background(250);
      p5.push();
      if (typeof predictionsRef.current == "object") {
        try {
          const keys = predictionsRef.current[0].keypoints;
          const finger = [
            // data
            { x: keys[5].x - keys[0].x, y: keys[5].y - keys[0].y },
            { x: keys[6].x - keys[5].x, y: keys[6].y - keys[5].y },
            { x: keys[7].x - keys[6].x, y: keys[7].y - keys[6].y },
            { x: keys[8].x - keys[7].x, y: keys[8].y - keys[7].y },
          ];

          const origin = { x: 0, y: 0 };
          let pos;
          let pos_prev;
          p5.translate(p5.width / 2, p5.height / 2);
          p5.rotate(-p5.PI / 2);

          //tail
          pos = rigmap(origin, finger[0], 97.6);
          drawInterporatedEllipse(p5, origin, pos, hip_r, tail_r[0], 100);
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[1], 92);
          drawInterporatedEllipse(p5, pos_prev, pos, tail_r[0], tail_r[1], 100);
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[2], 67);
          drawInterporatedEllipse(p5, pos_prev, pos, tail_r[1], tail_r[2], 30);
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[3], 51.3);
          drawInterporatedEllipse(p5, pos_prev, pos, tail_r[2], tail_r[3], 30);
        } catch (e) {}
      }
    };
  }
  return <ReactP5Wrapper sketch={sketch} />;
};
