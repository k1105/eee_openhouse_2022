import { ReactP5Wrapper } from "react-p5-wrapper";
import { drawInterporatedEllipse } from "../lib/drawInterporatedEllipse";
import { rigmap } from "../lib/rigmap";

export const DrawLegToFoot = ({ predictionsRef }) => {
  const hip_r = 130;
  const leg_r = [27.9, 19.8, 23.6, 15.5];
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

          p5.push();
          //leg
          p5.rotate((6.1 * p5.PI) / 6);
          pos = rigmap(origin, finger[1], 106.3);
          console.log(pos);
          drawInterporatedEllipse(p5, origin, pos, hip_r, leg_r[0], 100);
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[2], 51);
          drawInterporatedEllipse(p5, pos_prev, pos, leg_r[0], leg_r[1], 100);
          //foot
          p5.translate(pos.x, pos.y);
          pos_prev = pos;
          pos = rigmap(origin, finger[1], 35.4);
          drawInterporatedEllipse(p5, origin, pos, leg_r[1], leg_r[2], 100);
          pos_prev = pos;
          pos = rigmap(pos, finger[2], 34.1);
          drawInterporatedEllipse(
            p5,
            pos_prev,
            { x: -pos.x, y: pos.y },
            leg_r[2],
            leg_r[3],
            100
          );
          p5.pop();
        } catch (e) {}
      }
    };
  }
  return <ReactP5Wrapper sketch={sketch} />;
};
