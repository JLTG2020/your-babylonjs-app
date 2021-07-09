import { Vector3 } from "@babylonjs/core";
import { viewerManager, DefaultViewer } from "@babylonjs/viewer";
import React, { Suspense, useEffect, useRef } from "react";
import { Model, Scene, Engine, ArcRotateCamera, HemisphericLight } from "react-babylonjs";

const ViewerComponent: React.FC = () => {

  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene>
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
        {/* <Suspense
          fallback={
            <box name="fallback" position={new Vector3(-2.5, -1.5, 0)} />
          }
        > */}
          <Model
            name="model"
            sceneFilename="scene.gltf"
            scaleToDimension={3.0}
            rootUrl="src/ss/"
            position={new Vector3(-2.5, -1.5, 0)}
          />
        {/* </Suspense> */}
      </Scene>
    </Engine>
  );
};

export default ViewerComponent;

