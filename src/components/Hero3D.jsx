import { Component, useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

function fibonacciSphere(count, radius = 2.1) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(1, count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const angle = goldenAngle * index;
    positions[index * 3] = Math.cos(angle) * ring * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(angle) * ring * radius;
  }
  return positions;
}

function NetworkGlobe({ mobile }) {
  const group = useRef();
  const orbit = useRef();
  const pointerTarget = useRef(new THREE.Vector3());
  const { camera, pointer } = useThree();
  const nodePositions = useMemo(() => fibonacciSphere(mobile ? 74 : 132, 2.05), [mobile]);
  const linePositions = useMemo(() => {
    const count = nodePositions.length / 3;
    const edges = [];
    for (let index = 0; index < count; index += 1) {
      for (const step of [5, 11]) {
        const next = (index + step) % count;
        for (let axis = 0; axis < 3; axis += 1) {
          edges.push(nodePositions[index * 3 + axis], nodePositions[next * 3 + axis]);
        }
      }
    }
    return new Float32Array(edges);
  }, [nodePositions]);
  const ambientPositions = useMemo(() => fibonacciSphere(mobile ? 90 : 220, 3.2), [mobile]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  const nodeGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    return geom;
  }, [nodePositions]);

  const ambientGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    return geom;
  }, [ambientPositions]);

  useFrame((_state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.075;
    if (orbit.current) orbit.current.rotation.z += delta * 0.035;
    const px = (pointer && typeof pointer.x === 'number') ? pointer.x : 0;
    const py = (pointer && typeof pointer.y === 'number') ? pointer.y : 0;
    pointerTarget.current.set(px * 0.36, py * 0.24, 8);
    camera.position.lerp(pointerTarget.current, Math.min(delta * 0.75, 0.035));
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[4, 4, 5]} intensity={2.1} color="#7588ff" />
      <pointLight position={[-4, -2, 3]} intensity={1.15} color="#ff3434" />
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.48, 2]} />
          <meshPhysicalMaterial
            color="#101a66"
            emissive="#111b79"
            emissiveIntensity={0.26}
            metalness={0.62}
            roughness={0.4}
            transparent
            opacity={0.7}
            wireframe
          />
        </mesh>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#4867ff" transparent opacity={0.34} />
        </lineSegments>
        <points geometry={nodeGeometry} frustumCulled={false}>
          <pointsMaterial color="#a3b1ff" size={0.045} sizeAttenuation transparent opacity={0.9} />
        </points>
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.12}>
          <mesh ref={orbit} rotation={[1.18, 0.2, -0.3]}>
            <torusGeometry args={[2.28, 0.014, 10, 180]} />
            <meshBasicMaterial color="#ff2a2a" transparent opacity={0.94} />
          </mesh>
        </Float>
        <mesh rotation={[0.5, -0.2, 0.7]}>
          <torusGeometry args={[2.42, 0.006, 8, 180]} />
          <meshBasicMaterial color="#5470ff" transparent opacity={0.5} />
        </mesh>
      </group>
      <points geometry={ambientGeometry} frustumCulled={false}>
        <pointsMaterial color="#a4b2ff" size={0.018} sizeAttenuation transparent opacity={0.55} />
      </points>
    </>
  );
}

class CanvasBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('Hero3D canvas issue caught:', err);
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Hero3D() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const smallScreen = window.matchMedia('(max-width: 640px)').matches;
    setMobile(smallScreen);
    try {
      const canvas = document.createElement('canvas');
      const supported = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
      setWebgl(supported);
      setReady(supported && !reduceMotion);
    } catch {
      setWebgl(false);
      setReady(false);
    }
  }, [reduceMotion]);

  return (
    <div
      className={`hero-visual${ready && webgl ? ' hero-visual-live' : ''}`}
      aria-hidden="true"
    >
      <div className="hero-visual-fallback">
        <span className="fallback-orbit fallback-orbit-one" />
        <span className="fallback-orbit fallback-orbit-two" />
        <span className="fallback-core" />
      </div>
      {ready && webgl && (
        <CanvasBoundary onFail={() => setReady(false)}>
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 8], fov: 36 }}
              gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
            >
              <NetworkGlobe mobile={mobile} />
            </Canvas>
          </Suspense>
        </CanvasBoundary>
      )}
      <span className="hero-visual-caption">Connected ideas. Practical technology.</span>
    </div>
  );
}
