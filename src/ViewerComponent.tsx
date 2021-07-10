import React, { Suspense, useEffect, useRef } from "react";
import { Vector3 } from "@babylonjs/core";
import { Model, Scene, Engine } from "react-babylonjs";
import "@babylonjs/inspector";


const ViewerComponent: React.FC = () => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene
      >
        <arcRotateCamera
          name="camera1"
          alpha={Math.PI / 2}
          beta={Math.PI / 2}
          radius={9.0}
          target={Vector3.Zero()}
          minZ={0.001}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <Suspense
          fallback={
            <box name="fallback" position={new Vector3(0, 0, 0)} />
          }
        >
          <Model
            name="model"
            sceneFilename="scene.gltf"
            scaleToDimension={5.0}
            rootUrl="./cy/"
            position={new Vector3(0, -2.5, 0)}
          />
        </Suspense>
      </Scene>
    </Engine>
  );
};

export default ViewerComponent;

