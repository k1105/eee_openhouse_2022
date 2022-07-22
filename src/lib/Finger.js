import React from "react";
import "@tensorflow/tfjs";
import { useFrame } from "@react-three/fiber";

const scale = (point) => -(point * 800) / 50;

export const Finger = ({ predictionsRef, fingerIndex }) => {
  const jointBottom = React.useRef();
  const jointMiddleBottom = React.useRef();
  const jointMiddleTop = React.useRef();
  const jointTop = React.useRef();

  const updateJoint = (point, thumb) => {
    thumb.current.position.x = -scale(point.x);
    thumb.current.position.y = scale(point.y);
    thumb.current.position.z = scale(point.z);
  };

  useFrame(() => {
    if (predictionsRef.current.length) {
      updateJoint(
        predictionsRef.current[0].keypoints3D[Number(fingerIndex)],
        jointBottom
      );
      updateJoint(
        predictionsRef.current[0].keypoints3D[Number(fingerIndex) + 1],
        jointMiddleBottom
      );
      updateJoint(
        predictionsRef.current[0].keypoints3D[Number(fingerIndex) + 2],
        jointMiddleTop
      );
      updateJoint(
        predictionsRef.current[0].keypoints3D[Number(fingerIndex) + 3],
        jointTop
      );
    }
  });

  return (
    <>
      <mesh castShadow receiveShadow ref={jointBottom} scale={[1, 1, 1]}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
      <mesh castShadow receiveShadow ref={jointMiddleBottom} scale={[1, 1, 1]}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
      <mesh castShadow receiveShadow ref={jointMiddleTop} scale={[1, 1, 1]}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
      <mesh castShadow receiveShadow ref={jointTop} scale={[1, 1, 1]}>
        <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="#eb3b5a" />
      </mesh>
    </>
  );
};
