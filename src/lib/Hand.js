import React from "react";
import "@tensorflow/tfjs";
import { useFrame } from "@react-three/fiber";
import { Finger } from "./Finger";
const scale = (point) => -(point * 800) / 50;

export const Hand = ({ predictionsRef }) => {
  const palm = React.useRef();

  useFrame(() => {
    if (predictionsRef.current.length) {
      const point = predictionsRef.current[0].keypoints3D[0];
      palm.current.position.x = -scale(point.x);
      palm.current.position.y = scale(point.y);
      palm.current.position.z = scale(point.z);
    }
  });

  return (
    <>
      <mesh castShadow receiveShadow ref={palm} scale={[1, 1, 1]}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="#3867d6" />
      </mesh>
      <Finger predictionsRef={predictionsRef} fingerIndex="1" />
      <Finger predictionsRef={predictionsRef} fingerIndex="5" />
      <Finger predictionsRef={predictionsRef} fingerIndex="9" />
      <Finger predictionsRef={predictionsRef} fingerIndex="13" />
      <Finger predictionsRef={predictionsRef} fingerIndex="17" />
    </>
  );
};
