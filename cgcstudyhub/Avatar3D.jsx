import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AvatarModel() {
  const { scene } = useGLTF("/avatar.glb"); // put your model in public/
  return <primitive object={scene} scale={2} />;
}

export default function Avatar3D() {
  return (
    <div className="fixed bottom-4 right-4 w-40 h-40">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} />
        <AvatarModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
