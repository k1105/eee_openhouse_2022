import { ReactP5Wrapper } from "react-p5-wrapper";
import { drawInterporatedEllipse } from "../lib/drawInterporatedEllipse";
import { rigmap } from "../lib/rigmap";

export const DrawArmToHand = ({ predictionsRef }) => {
  const arm_r = [24.7, 10.2, 8.1, 14.1];
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
          p5.rotate(p5.PI);
          p5.rotate(-p5.PI / 6);
          pos = rigmap(origin, finger[1], 93.3); // ここでのfingerはshoulderのfinger[1].
          p5.translate(pos.x, pos.y);
          //cancel rotation
          p5.rotate(-p5.PI);
          p5.rotate(p5.PI / 6);
          //arm
          p5.translate(30.6, 41);
          p5.rotate(p5.PI);
          pos = rigmap(origin, finger[1], 22.1);
          drawInterporatedEllipse(p5, origin, pos, arm_r[0], arm_r[1], 50);
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[2], 25);
          drawInterporatedEllipse(p5, pos_prev, pos, arm_r[1], arm_r[2], 30);
          //handtip
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[1], 16.4);
          drawInterporatedEllipse(p5, pos_prev, pos, arm_r[2], arm_r[3], 100);
          p5.pop();
        } catch (e) {}
      }
    };
  }
  return <ReactP5Wrapper sketch={sketch} />;
};
