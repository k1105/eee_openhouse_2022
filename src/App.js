import { useCallback, useRef, useState, useEffect } from "react";
import "./styles.css";
import "@tensorflow/tfjs";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";
import { DisplayFinger } from "./sketches/DisplayFinger";

export default function App() {
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const requestRef = useRef(null);
  const predictionsRef = useRef(null);
  const [ready, setReady] = useState(false);
  const lostCountRef = useRef(0);
  const timer = 120000;

  const capture = useCallback(async () => {
    if (webcamRef.current && modelRef.current) {
      //webcamとmodelのインスタンスが生成されていたら
      const predictions = await modelRef.current.estimateHands(
        webcamRef.current.getCanvas()
      ); //webcamの現時点でのフレームを取得し、ポーズ推定の結果をpredictionsに非同期で格納

      if (predictions) {
        //predictionsが存在していたら
        if (predictions.length > 0) {
          predictionsRef.current = predictions;
          lostCountRef.current = 0;
        } else {
          lostCountRef.current++;
        }

        if (lostCountRef.current > 10) {
          predictionsRef.current = [];
        }
      }
    }

    // need to fix: ready stateが更新されてもなお同じreadyの値がよばれ続けてしまう
    if (ready) {
      requestRef.current = requestAnimationFrame(capture); //captureを実施
    } else {
      //not working
      requestRef.current = null;
    }
  }, [ready]);

  useEffect(() => {
    const load = async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: "tfjs",
        modelType: "full",
      };
      modelRef.current = await handPoseDetection.createDetector(
        model,
        detectorConfig
      );
    };

    load();

    setReady(true);
    setInterval("location.reload()", timer);
  }, []);

  useEffect(() => {
    if (ready) {
      requestRef.current = requestAnimationFrame(capture);
    } else {
      if (requestRef.current) {
        console.log("cancel");
        cancelAnimationFrame(requestRef.current); //not working
      }
    }
  }, [capture, ready]);

  return (
    <>
      {/* //optional sketch */}
      {ready && <DisplayFinger predictionsRef={predictionsRef} />}
      <div
        style={{
          position: "absolute",
          right: -190,
          top: -10,
        }}
      >
        <Webcam
          width="200"
          height="113"
          mirrored
          id="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <div
        style={{
          backgroundColor: "rgba(23,32,23,0.3)",
          position: "absolute",
          color: "white",
          display: "flex",
          cursor: "pointer",
          top: 10,
          left: 10,
        }}
      ></div>
    </>
  );
}
