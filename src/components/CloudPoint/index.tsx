import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import './index.module.less';
import React from 'react';
import { OrbitControls } from './OrbitControls';
import pako from 'pako';
export interface CloudPointProps {
  width: number;
  height: number;
  isFixedAspect: boolean;
  wsUrl: string;
}

const CloudPoint: React.FC<CloudPointProps> = (props: CloudPointProps) => {
  const { width, height, isFixedAspect = false, wsUrl } = props;
  const ws = useRef<WebSocket | null>(null);
  const timerRef = useRef<NodeJS.Timer>();

  // dom 节点
  const domRef = useRef<HTMLDivElement>(null);
  // 创建场景
  const scene = useMemo(() => new THREE.Scene(), []);

  // 创建渲染器
  const renderer = useMemo(() => new THREE.WebGLRenderer(), []);

  // 创建相机
  const camera = useMemo(() => new THREE.PerspectiveCamera(), []);

  // 创建素材
  const materials = new THREE.PointsMaterial({
    size: 4,
    color: 0xffffff,
    sizeAttenuation: true,
    transparent: true,
    opacity: 1,
  });
  // 创建初始化场景容器
  const geometry = new THREE.BufferGeometry();
  const cloud = new THREE.Points(geometry, materials);
  scene.add(cloud);

  function decompressData(compressedData) {
    const uint8Array = new Uint8Array(compressedData);
    const decompressedData = pako.inflate(uint8Array, { to: 'string' });
    return decompressedData;
  }

  function blobToUint8Array(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          const uint8Array = new Uint8Array(reader.result);
          resolve(uint8Array);
        } else {
          reject(new Error('Failed to read Blob as Uint8Array.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read Blob as Uint8Array.'));
      };

      reader.readAsArrayBuffer(blob);
    });
  }

  // 更新云点数据
  const updatePoint = useCallback(
    (points: number[]) => {
      const point = [];

      for (let i = 0; i < points.length; i += 3) {
        point.push(new THREE.Vector3(points[i], points[i + 1], points[i + 2]));
      }
      geometry.setFromPoints(point);
    },
    [geometry],
  );

  // 初始化webSocket
  const initWebSocket = useCallback(() => {
    if (!ws.current) {
      ws.current = new WebSocket(wsUrl);
      ws.current.onopen = () => {
        if (ws.current?.OPEN) {
          ws.current?.send('connected');
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              ws.current?.send('connected');
            }, 30000);
          }
        }
      };
      ws.current.onmessage = e => {
        blobToUint8Array(e.data)
          .then(compressedDataUint8Array => {
            const decompressedData = decompressData(compressedDataUint8Array);
            const points = JSON.parse(decompressedData);
            updatePoint(points);
          })
          .catch(error => {
            console.error(error);
          });
      };
      ws.current.onclose = () => {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
        ws.current = null;
      };
    }
  }, [updatePoint]);

  // 初始化相机
  const initCamera = useCallback(() => {
    camera.aspect = isFixedAspect ? width / height : window.innerWidth / window.innerHeight;
    camera.fov = 750;
    camera.near = 0.1;
    camera.far = 2000000;
    // 设置相机位置
    camera.position.set(0, 100000, -150000);
    // 设置相机面向 xyz坐标观察
    camera.lookAt(0, 100000, -150000);
    camera.updateProjectionMatrix();
  }, [camera, height, isFixedAspect, width]);

  // 初始化渲染场景
  const initRenderer = useCallback(() => {
    // 设置分辨率为当前设备的分辨率，解决场景模糊，抗锯齿的一种很好的方法
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设置画布大小
    renderer.setSize(width, height);
    // 挂载 DOM
    domRef.current?.appendChild(renderer.domElement);
  }, [renderer, width, height]);

  // 初始化交互
  const initControls = useCallback(() => {
    console.log('camera', camera, renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 是否有惯性
    //   //相机向外移动极限
    controls.maxDistance = 2000000;
  }, [camera, renderer]);

  // 渲染函数
  const renders = useCallback(() => {
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame(renders);
  }, [renderer, scene, camera]);

  // 根据页面大小进行重绘
  const onWindowResize = useCallback(() => {
    if (!isFixedAspect) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renders();
    }
  }, [camera, isFixedAspect, renderer, renders]);

  useEffect(() => {
    initWebSocket();
    initCamera();
    initRenderer();
    initControls();
    renders();

    window.addEventListener('resize', onWindowResize, false);
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      ws.current.close();
    };
  }, []);

  return <div id="cloud-point-container" ref={domRef} />;
};

export default CloudPoint;
