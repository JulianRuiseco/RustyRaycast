// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FunctionComponent, useCallback } from 'react';
import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import {
  NodeMaterial,
  Vector3,
  SceneLoader,
  CubicEase, Animation, EasingFunction, ExecuteCodeAction, ActionManager, Camera,
} from '@babylonjs/core';
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import {
  Engine, Scene as SceneReact, SceneEventArgs,
} from 'react-babylonjs';
import { Scene as SceneCore } from '@babylonjs/core/scene';
import * as CANNON from 'cannon';
import 'babylonjs-loaders';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

let scene: SceneCore;
let camera: Camera;

const zoom = (cam: Camera, tar: AbstractMesh, position: Vector3) => {
  const targetEndPos = position;
  const speed = 250;
  const ease = new CubicEase();

  tar.computeWorldMatrix();
  const matrix = tar.getWorldMatrix();
  const localPosition = new Vector3(0, 0, 0);
  localPosition.addInPlace(new Vector3(0, 0, -5));
  const globalPosition = Vector3.TransformCoordinates(localPosition, matrix);
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  Animation.CreateAndStartAnimation('at4', cam, 'position', speed, 1000, cam.position, globalPosition, 0, ease);
  Animation.CreateAndStartAnimation('at5', cam, 'target', speed, 1000, cam.getLeftTarget(), targetEndPos, 0, ease);
  // cam.lockedTarget = tar;
};

const onSceneMounted = (sceneEventArgs: SceneEventArgs) => {
  scene = sceneEventArgs.scene;
  scene.debugLayer.show();
  scene.getEngine().resize();
  SceneLoader.Append('./assets/', 'plswork.stl', scene, (scenery) => {
    console.log(scenery);
    const importerObject = scenery.getMeshByName('stlmesh');
    if (importerObject == null) {
      return;
    }

    const test = NodeMaterial.CreateDefault('test', scene);
    test.setToDefault();
    test.loadAsync('works.json').then(() => {
      test.build(true);
      test.needDepthPrePass = true;
      test.backFaceCulling = false;
      importerObject.material = test;
    });

    console.log(importerObject);
    importerObject.useOctreeForPicking = true;
    importerObject.actionManager = new ActionManager(scene);
    scene.createOrUpdateSelectionOctree();
    importerObject.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger,
        ((event) => {
          const pickedMesh = event.meshUnderPointer;
          const position = scene?.pick(event.pointerX, event.pointerY)?.pickedPoint;
          if (position && pickedMesh) {
            zoom(camera, pickedMesh, position);
          }
        })),
    );
  });
};

const DefaultPlayground: FunctionComponent = () => {
  const cameraRef = useCallback((node) => {
    camera = node.hostInstance;
  }, []);

  return (
    <Engine antialias canvasId="sample-canvas">
      <SceneReact
        onSceneMount={onSceneMounted}
        enablePhysics={[gravityVector, new CannonJSPlugin()]}
      >
        <arcRotateCamera
          ref={cameraRef}
          name="arc"
          target={new Vector3(0, 1, 0)}
          alpha={-Math.PI / 2}
          beta={(0.5 + (Math.PI / 4))}
          radius={10}
          minZ={0.001}
          wheelPrecision={50}
        />
        <hemisphericLight name="hemi" direction={new Vector3(0, -1, 0)} intensity={0.8} />
        <directionalLight
          name="shadow-light"
          setDirectionToTarget={[Vector3.Zero()]}
          direction={Vector3.Zero()}
          position={new Vector3(-40, 30, -40)}
          intensity={0.4}
          shadowMinZ={1}
          shadowMaxZ={2500}
        />
      </SceneReact>
    </Engine>
  );
};


export default DefaultPlayground;
