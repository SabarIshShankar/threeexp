import React, { useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { softShadows } from "@react-three/drei";
import "./styles.css";

softShadows(); //inject

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
function Sphere({ position = [0, 0, 0], ...props }) {
  const ref = useRef();
  const factor = useMemo(() => 0.5 + Math.random(), []);
  useFrame((state) => {
    const t = easeInOutCubic(
      (1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2
    );
    ref.current.position.y = position[1] + t * 4;
    ref.current.scale.y = 1 + t * 3;
  });
  return (
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        color="lightblue"
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  );
}

function Spheres({ number = 20 }) {
  const ref = useRef();
  const positions = useMemo(
    () =>
      [...new Array(number)].map(() => [
        3 - Math.random() * 6,
        Math.random() * 4,
        3 - Math.random() * 6
      ]),
    []
  );
  useFrame(
    (state) =>
      (ref.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() / 2) * Math.PI)
  );
  return (
    <group ref={ref}>
      {positions.map((pos, index) => (
        <Sphere key={index} position={pos} />
      ))}
    </group>
  );
}
