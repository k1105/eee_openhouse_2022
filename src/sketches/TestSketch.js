const scale = (point) => -(point * 800) / 50;

export const TestSketch = (p) => {
  let rotation = 0;

  //初期設定
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  //P5Wrapperコンポーネントからのpropsの受け渡し
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  //毎フレームごとの描画内容
  p.draw = () => {
    p.background(100);
    p.normalMaterial();
    p.noStroke();
    p.push();
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
};
