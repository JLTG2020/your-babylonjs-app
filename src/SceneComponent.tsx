import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, Engine, SceneLoader } from '@babylonjs/core';
import React, { useEffect, useRef } from 'react';

let box: Mesh;

/**
 * 当scene准备好之后调用
 * @param scene 
 */
const onSceneReady = (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

  SceneLoader.ImportMeshAsync('', 'https://assets.babylonjs.com/meshes/', 'both_houses_scene.babylon').then((result) => {

  });
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis. 关于y轴旋转
 */
const onRender = (scene: Scene) => {
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();

  //   const rpm = 10;
  //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }
};

interface SceneComponentProp {
  [x: string]: any;
  antialias?: boolean;
  engineOptions?: any;
  adaptToDeviceRatio?: any;
  sceneOptions?: any;
};

const SceneComponent = (props: SceneComponentProp) => {
  const reactCanvas = useRef(null);
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, ...rest } = props;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);  // 初始化一个
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {  // scene初始化完成之后调用
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scener) => onSceneReady(scener));  // 每完成就添加监听，并在完成的时候执行一次
      }

      engine.runRenderLoop(() => {  // engine每帧都调用该函数
        if (typeof onRender === 'function') {
          onRender(scene);
        }
        scene.render(); // scene重新渲染
      });

      const resize = () => {  // 重置当前屏幕大小
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener('resize', resize); // 当window的大小改变时调用
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);  // 删除监听
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactCanvas]); // 当reactCanvas改变时调用

  return <canvas ref={reactCanvas} {...rest} />;
};

export default SceneComponent;
