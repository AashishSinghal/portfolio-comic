"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface LiquidTextProps {
  text?: string;
  fontSize?: number;
  font?: string;
  color?: string;
  lightColor?: string;
  darkColor?: string;
  className?: string;
  displacementStrength?: number;
  displacementRadius?: number;
  /** Camera tilt: 0 = flat face-on, 1 = full original 3D angle */
  tilt?: number;
  /** Camera zoom: higher = closer to text. Default 1 */
  zoom?: number;
  /** Text alignment on the canvas. Default "center" */
  textAlign?: "left" | "center";
  /** Called when the WebGL canvas has mounted and rendered */
  onReady?: () => void;
}

function createTextTexture(
  text: string,
  size: number,
  font: string,
  color: string,
  align: "left" | "center" = "center"
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";

  if (align === "left") {
    ctx.textAlign = "left";
    ctx.fillText(text, 40, canvas.height / 2);
  } else {
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const vertexShader = `
  varying vec2 vUv;
  uniform vec3 uDisplacement;
  uniform float uStrength;
  uniform float uRadius;

  float easeInOutCubic(float x) {
    return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
  }

  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  void main() {
    vUv = uv;
    vec3 displaced = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    float dist = length(uDisplacement - worldPosition.rgb);

    if (dist < uRadius) {
      float mapped = map(dist, 0.0, uRadius, 1.0, 0.0);
      displaced.z += easeInOutCubic(mapped) * uStrength;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

export function LiquidText({
  text = "Liquid Text",
  fontSize = 200,
  font = "Bangers, cursive",
  color,
  lightColor = "#0D0D0D",
  darkColor = "#FFFEF2",
  className,
  displacementStrength = 1.0,
  displacementRadius = 3.0,
  tilt = 1.0,
  zoom = 1,
  textAlign = "center",
  onReady,
}: LiquidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      await document.fonts.ready;

      const rect = container.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;
      if (height === 0) return;

      // Use a wide, short plane to match the wide canvas aspect ratio (4:1)
      const planeW = 16;
      const planeH = 4;

      const scene = new THREE.Scene();
      scene.background = null;

      const cameraDistance = 5 / zoom;
      const aspect = width / height;
      const camera = new THREE.OrthographicCamera(
        -cameraDistance * aspect,
        cameraDistance * aspect,
        cameraDistance,
        -cameraDistance,
        0.01,
        1000
      );
      // tilt=0 → face-on, tilt=1 → full 3D angle
      const camY = -8 * tilt;
      const camZ = 4 + 8 * (1 - tilt);
      camera.position.set(0, camY, camZ);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.appendChild(renderer.domElement);

      const geometry = new THREE.PlaneGeometry(planeW, planeH, 80, 20);

      const getActiveColor = () =>
        color ||
        (document.documentElement.classList.contains("dark")
          ? darkColor
          : lightColor);

      let currentColor = getActiveColor();
      let textTexture = createTextTexture(text, fontSize, font, currentColor, textAlign);

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: textTexture },
          uDisplacement: { value: new THREE.Vector3(0, 0, 0) },
          uStrength: { value: displacementStrength },
          uRadius: { value: displacementRadius },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const plane = new THREE.Mesh(geometry, shaderMaterial);
      plane.rotation.z = (Math.PI / 6) * tilt;
      scene.add(plane);

      const hitPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
      );
      scene.add(hitPlane);

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const onPointerMove = (e: PointerEvent) => {
        const bounds = container.getBoundingClientRect();
        pointer.x = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.y = -((e.clientY - bounds.top) / bounds.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const [hit] = raycaster.intersectObject(hitPlane);
        if (hit)
          (shaderMaterial.uniforms.uDisplacement.value as THREE.Vector3).copy(
            hit.point
          );
      };

      container.addEventListener("pointermove", onPointerMove);

      const handleResize = () => {
        const r = container.getBoundingClientRect();
        if (r.height === 0) return;
        const a = r.width / r.height;
        camera.left = -cameraDistance * a;
        camera.right = cameraDistance * a;
        camera.updateProjectionMatrix();
        renderer.setSize(r.width, r.height, false);
      };

      window.addEventListener("resize", handleResize);

      let animationId = 0;
      let firstFrame = true;
      const render = () => {
        animationId = requestAnimationFrame(render);
        renderer.render(scene, camera);
        if (firstFrame) {
          firstFrame = false;
          onReady?.();
        }
      };
      render();

      const observer = new MutationObserver(() => {
        const next = getActiveColor();
        if (next !== currentColor) {
          const tex = createTextTexture(text, fontSize, font, next, textAlign);
          shaderMaterial.uniforms.uTexture.value = tex;
          textTexture.dispose();
          textTexture = tex;
          currentColor = next;
        }
      });

      if (!color) {
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("pointermove", onPointerMove);
        cancelAnimationFrame(animationId);
        observer.disconnect();
        if (renderer.domElement.parentNode === container)
          container.removeChild(renderer.domElement);
        renderer.dispose();
        textTexture.dispose();
        geometry.dispose();
        shaderMaterial.dispose();
      };
    };

    init();

    return () => cleanup?.();
  }, [text, fontSize, font, color, lightColor, darkColor, displacementStrength, displacementRadius, tilt, zoom, textAlign, onReady]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    />
  );
}
