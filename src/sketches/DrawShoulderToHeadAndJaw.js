import { ReactP5Wrapper } from "react-p5-wrapper";
import { drawInterporatedEllipse } from "../lib/drawInterporatedEllipse";
import { rigmap } from "../lib/rigmap";

export const DrawShoulderToHeadAndJaw = ({ predictionsRef }) => {
  const hip_r = 130;
  const shoulder_r = 112.2;
  const head_r = [88.9, 43];
  const jaw_r = [28.2, 18.7];
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
          p5.rotate(p5.PI / 4);
          //shoulder
          //finger = shoulder_finger;
          pos = rigmap(origin, finger[1], 93.3);
          drawInterporatedEllipse(
            p5,
            origin,
            { x: -pos.x, y: pos.y },
            hip_r,
            shoulder_r,
            100
          );
          pos_prev = pos;
          pos = rigmap(pos_prev, finger[2], 132.9);
          drawInterporatedEllipse(
            p5,
            { x: -pos_prev.x, y: pos_prev.y },
            { x: -pos.x, y: pos.y },
            shoulder_r,
            head_r[0],
            100
          );

          //head
          //finger = head_finger;
          p5.translate(-pos.x, pos.y);
          p5.rotate(p5.PI / 6);
          pos = rigmap(origin, finger[1], 89);
          drawInterporatedEllipse(
            p5,
            origin,
            { x: -pos.x, y: pos.y },
            head_r[0],
            head_r[1],
            100
          );
          //jaw
          //finger = jaw_finger;
          p5.rotate(p5.PI / 3);
          pos = rigmap(origin, finger[1], 60.1);
          drawInterporatedEllipse(p5, origin, pos, head_r[0], jaw_r[0], 100);
          pos_prev = pos;
          pos = rigmap(pos, finger[2], 35.8);
          drawInterporatedEllipse(p5, pos_prev, pos, jaw_r[0], jaw_r[1], 100);
          p5.pop();
        } catch (e) {}
      }
    };
  }
  return <ReactP5Wrapper sketch={sketch} />;
};
