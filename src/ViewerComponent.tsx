import { Vector3 } from "@babylonjs/core";
import { viewerManager, DefaultViewer } from "@babylonjs/viewer";
import React, { Suspense, useEffect, useRef } from "react";
import { Model, Scene, Engine } from "react-babylonjs";

const ViewerComponent: React.FC = () => {
  //   const reactCanvas = useRef(null);

  //   // eslint-disable-next-line consistent-return
  //   useEffect(() => {
  //     if (reactCanvas.current !== null ) {
  //         const currentCanvas = reactCanvas.current;
  //         if (currentCanvas !== null) {
  //             const viewer = new DefaultViewer(currentCanvas);
  //             viewer.onSceneInitObservable.add(() => {
  //                 viewer.sceneManager.camera.radius = 15;
  //                 viewer.sceneManager.camera.beta = Math.PI / 2.2;
  //               });
  //             viewer.onEngineInitObservable.add(() => {
  //                 viewer.loadModel({
  //                   url: "https://assets.babylonjs.com/meshes/village.glb",
  //                 });
  //               });
  //             viewerManager.addViewer(viewer);

  //             const viewer2 = viewerManager.getViewerByHTMLElement(currentCanvas);
  //             console.log('test');
  //         }

  //         // viewerManager.getViewerPromiseById('myViewer').then((viewer) => {
  //         //     viewer.onSceneInitObservable.add(() => {
  //         //         viewer.sceneManager.camera.radius = 15; //set camera radius
  //         //         viewer.sceneManager.camera.beta = Math.PI / 2.2; //angle of depression
  //         //     });
  //         //     viewer.onEngineInitObservable.add((scene) => {
  //         //         viewer.loadModel({
  //         //             url: "path to model file"
  //         //         });
  //         //     });
  //         // });

  //         return () => {
  //             viewerManager.dispose();
  //           };
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [reactCanvas]); // 当reactCanvas改变时调用

  //   return <canvas ref={reactCanvas} />;
  // return <Model name='model' sceneFilename='./scene.babylon' rootUrl='https://assets.babylonjs.com/meshes/village.glb' position={new Vector3(0, 0, 0)} />

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
        <Suspense
          fallback={
            <box name="fallback" position={new Vector3(-2.5, -1.5, 0)} />
          }
        >
          <Model
            name="model"
            sceneFilename="scene.gltf"
            scaleToDimension={3.0}
            rootUrl="src/ss/"
            position={new Vector3(-2.5, -1.5, 0)}
          />
        </Suspense>
      </Scene>
    </Engine>
  );
};

export default ViewerComponent;

