import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Mesh,
  Engine,
  SceneLoader,
  Nullable,
  AbstractMesh,
  Sound,
  StandardMaterial,
  Color3,
  Texture,
  ArcRotateCamera,
  Vector4,
} from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

let box: Mesh;
let roof: Mesh;
let house: Nullable<AbstractMesh>;

/**
 * 当scene准备好之后调用
 * @param scene
 */
const onSceneReady = (scene: Scene) => {
  // // This creates and positions a free camera (non-mesh)
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    new Vector3(0, 0, 0),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Load the sound, give it time to load and play it every 3 seconds
  const bounce = new Sound("bounce", "sounds/bounce.wav", scene);
  setInterval(() => bounce.play(), 3000);

  //options parameter to set different images on each side
  const faceUV = [];
  faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //rear face
  faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //front face
  faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); //right side
  faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); //left side
  // // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true }, scene);
  box.scaling = new Vector3(1, 1, 1);
  box.position = new Vector3(0, 0.5, 0);

  // Our built-in 'ground' shape.
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene
  );
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0, 1, 0);
  ground.material = groundMat;

  roof = MeshBuilder.CreateCylinder(
    "roof",
    { diameter: 1.3, height: 1.2, tessellation: 3 },
    scene
  );
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const roofMat = new StandardMaterial("roofMat", scene);
  roofMat.diffuseTexture = new Texture(
    "https://assets.babylonjs.com/environments/roof.jpg",
    scene
  );
  const boxMat = new StandardMaterial("boxMat", scene);
  boxMat.diffuseTexture = new Texture(
    // "https://www.babylonjs-playground.com/textures/floor.png",
    "https://assets.babylonjs.com/environments/cubehouse.png",
    scene
  );

  roof.material = roofMat;
  box.material = boxMat;

  // SceneLoader.ImportMeshAsync('detached_house', 'https://assets.babylonjs.com/meshes/', 'both_houses_scene.babylon', scene).then((result) => {
  //   house = scene.getMeshByName('detached_house');
  //   if (house !== null) {
  //     house.scaling = new Vector3(2, 2, 2);   // 在不同方向上按比例缩放
  //     house.rotation = new Vector3(0, 0, 0);  // 改变物体朝向
  //     house.position = new Vector3(0, 0, 0);  // 改变物体位置 x:左右 y:上下 z:前后
  //   }
  // });
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis. 关于y轴旋转
 */
const onRender = (scene: Scene) => {
  if (box !== undefined && roof !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    roof.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
  if (house !== undefined && house !== null) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    // house.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

interface SceneComponentProp {
  [x: string]: any;
  antialias?: boolean;
  engineOptions?: any;
  adaptToDeviceRatio?: any;
  sceneOptions?: any;
}

const SceneComponent = (props: SceneComponentProp) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    ...rest
  } = props;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      ); // 初始化一个
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        // scene初始化完成之后调用
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scener) => onSceneReady(scener)); // 每完成就添加监听，并在完成的时候执行一次
      }

      engine.runRenderLoop(() => {
        // engine每帧都调用该函数
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render(); // scene重新渲染
      });

      const resize = () => {
        // 重置当前屏幕大小
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize); // 当window的大小改变时调用
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize); // 删除监听
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactCanvas]); // 当reactCanvas改变时调用

  return <canvas ref={reactCanvas} {...rest} />;
};

export default SceneComponent;
