// import resources from "../resources";
// import { spawnEntity } from "../modules/SpawnerFunctions";
// import { LifeItem } from "../itemflags/deathItem";
// import { Singleton } from "../components/playerDetail";
// import { BuilderHUD } from "../modules/BuilderHUD";

// export class BaseScene extends Entity {
//   private entity1;

//   constructor() {
//     super();
//     engine.addEntity(this);
//     var obj = Singleton.getInstance();
//     let song = obj.playRandom()
//     song.play()

//     const grassShape = new GLTFShape(
//       "models/FloorBaseGrass_01/FloorBaseGrass_01.glb"
//     );

//     this.entity1 = new Entity("grass");
//     this.entity1.addComponentOrReplace(grassShape);
//     const transform1 = new Transform({
//       position: new Vector3(-8, 1, 8),
//       rotation: new Quaternion(0, 0, 0, 1),
//       scale: new Vector3(1, 1, 1),
//     });
//     this.entity1.addComponentOrReplace(transform1);
//     this.entity1.addComponent(new LifeItem())
//     engine.addEntity(this.entity1);

//     // const hud: BuilderHUD = new BuilderHUD();
//     // hud.attachToEntity(this.potionshop);
//   }

//   unloadScene() {
//     engine.removeEntity(this.entity1);
//   }
// }
