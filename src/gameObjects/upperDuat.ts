// import resources from "../resources";
// import { spawnEntity } from "../modules/SpawnerFunctions";
// import { BuilderHUD } from "../modules/BuilderHUD";
// import { DeathItem } from "../itemflags/deathItem";
// import { SoundBox } from "../components/soundbox";
// import { movePlayerTo } from "@decentraland/RestrictedActions";

// export class UpperDuat extends Entity {
// //   private entity1;
// //   private entity1a;
// //   private smoke1;
// //   private smoke2;
// //   private entity2;

//   constructor() {
//     super();
//     engine.addEntity(this);

//     const parcelsCountX = 5;
//     const parcelsCountZ = 5;
//     const groundShape = new GLTFShape("models/skullsandbones.glb");
//     let smokeShape = resources.models.smokewavy;
//     let skyShape = resources.models.duatsky;
//     let dividerShape = resources.models.walldivider;


//     let soundbox = new SoundBox(
//       new Transform({ position: new Vector3(8, 0, 8) }),
//       resources.sounds.deathzone,
//       true
//     );
//     soundbox.addComponent(new DeathItem());
//     soundbox.play();

//     for (let i = 0; i < parcelsCountX; i++) {
//       for (let j = 0; j < parcelsCountZ; j++) {
        
//         let ground = new Entity();
//         let sky = new Entity();
//         let smoke = new Entity();
//         let smoke2 = new Entity();
//         let smoke3 = new Entity();
//         let smoke4 = new Entity();

//         ground.addComponent(groundShape);
//         ground.addComponent(new DeathItem());
        
//         sky.addComponent(skyShape);
//         sky.addComponent(new DeathItem());
        
//         smoke.addComponent(smokeShape);
//         smoke.addComponent(new DeathItem());
//         smoke2.addComponent(smokeShape);
//         smoke2.addComponent(new DeathItem());
//         smoke3.addComponent(smokeShape);
//         smoke3.addComponent(new DeathItem());
//         smoke4.addComponent(smokeShape);
//         smoke4.addComponent(new DeathItem());

//         ground.addComponent(
//           new Transform({ position: new Vector3(i * 16 + 8, 30.1, j * 16 + 8) })
//         );
        
//         sky.addComponent(
//           new Transform({
//             position: new Vector3(i * 15.8 + 8, 35.1, j * 15.8 + 8),
//           })
//         );
        
//         smoke.addComponent(
//           new Transform({ position: new Vector3(i * 16 + 8, 30.1, j * 16 + 8) })
//         );

//         smoke2.addComponent(
//           new Transform({ position: new Vector3(i * 16 + 4, 30.1, j * 16 + 8) })
//         );

//         smoke3.addComponent(
//           new Transform({ position: new Vector3(i * 16 + 2, 30.1, j * 16 + 8) })
//         );

//         smoke4.addComponent(
//           new Transform({ position: new Vector3(i * 16 + 6, 30.1, j * 16 + 8) })
//         );

//         engine.addEntity(ground);
//         engine.addEntity(sky);
//         engine.addEntity(smoke);
//         engine.addEntity(smoke2);
//         engine.addEntity(smoke3);
//         engine.addEntity(smoke4);
//       }
//     }


//     let topleftwalli = 3.7;
//     while (topleftwalli < 79.6) {
//       let topleftwall = new Entity(); 
//       topleftwall.addComponent(dividerShape);
//       topleftwall.addComponent(new DeathItem());
//       topleftwall.addComponent(
//         new Transform({ position: new Vector3(topleftwalli, 30.1, 79.6),rotation: Quaternion.Euler(0, -90, 0), scale: new Vector3(1, 1.7, 1) })
//       ); 
//       topleftwalli = topleftwalli + 3.4
//       engine.addEntity(topleftwall)
//     }

//     let toprightwalli = 3.7;
//     while (toprightwalli < 79.6) {
//       let toprightwall = new Entity(); 
//       toprightwall.addComponent(dividerShape);
//       toprightwall.addComponent(new DeathItem());
//       toprightwall.addComponent(
//         new Transform({ position: new Vector3(toprightwalli, 30.1, 0.4),rotation: Quaternion.Euler(0, -90, 0), scale: new Vector3(1, 1.7, 1) })
//       ); 
//       toprightwalli = toprightwalli + 3.4
//       engine.addEntity(toprightwall)
//     }

//     let topcenterwalli = 3.7;
//     while (topcenterwalli < 65) {
//       let topcenterwall = new Entity(); 
//       topcenterwall.addComponent(dividerShape);
//       topcenterwall.addComponent(new DeathItem());
//       topcenterwall.addComponent(
//         new Transform({ position: new Vector3(topcenterwalli, 30.1, 44.2),rotation: Quaternion.Euler(0, -90, 0), scale: new Vector3(1, 1.7, 1) })
//       ); 
//       topcenterwalli = topcenterwalli + 3.4
//       engine.addEntity(topcenterwall)
//     }

//     let topnorthwalli = 3.9;
//     while (topnorthwalli < 79.4) {
//       let topnorthwall = new Entity(); 
//       topnorthwall.addComponent(dividerShape);
//       topnorthwall.addComponent(new DeathItem());
//       topnorthwall.addComponent(
//         new Transform({ position: new Vector3(0.4, 30.1, topnorthwalli),rotation: Quaternion.Euler(180, 0, 180), scale: new Vector3(1, 1.7, 1) })
//       ); 
//       topnorthwalli = topnorthwalli + 3.4
//       engine.addEntity(topnorthwall)
//     }

//     let topsouthwalli = 23.9;
//     while (topsouthwalli < 79.4) {
//       let topsouthwall = new Entity(); 
//       topsouthwall.addComponent(dividerShape);
//       topsouthwall.addComponent(new DeathItem());
//       topsouthwall.addComponent(
//         new Transform({ position: new Vector3(79.5, 30.1, topsouthwalli),rotation: Quaternion.Euler(180, 0, 180), scale: new Vector3(1, 1.7, 1) })
//       ); 
//       topsouthwalli = topsouthwalli + 3.4
//       engine.addEntity(topsouthwall)
//     }

//     let topinteriorwalli = 13.9;
//     while (topinteriorwalli < 69.4) {
//       let topinteriorwall = new Entity(); 
//       topinteriorwall.addComponent(dividerShape);
//       topinteriorwall.addComponent(new DeathItem());
//       topinteriorwall.addComponent(
//         new Transform({ position: new Vector3(34.7, 30.1, topinteriorwalli),rotation: Quaternion.Euler(180, 0, 180), scale: new Vector3(1, 1.7, 1) })
//       ); 
//       topinteriorwalli = topinteriorwalli + 3.4
//       engine.addEntity(topinteriorwall)
//     }

    

//     const anpuartifact = new Entity("anpuartifact");
//     anpuartifact.addComponent(new DeathItem())
//     engine.addEntity(anpuartifact);
//     anpuartifact.addComponent(resources.models.anpuartifact);
//     anpuartifact.addComponent(
//       new Transform({
//         position: new Vector3(28.6,1.5, 26.9),
//         rotation: Quaternion.Euler(0, 90, 0),
//         scale: new Vector3(1, 1, 1),
//       }) 
//     );
//     anpuartifact.addComponentOrReplace(
//       new OnPointerDown(
//         (e) => {
//           log("Finding Anpu ");
//           movePlayerTo({ x: 42, y: 50, z: 26 });
//         },
//         {
//           button: ActionButton.PRIMARY,
//           showFeedback: true,
//           hoverText: "Locate Anpu",
//           distance: 20,
//         }
//       )
//     );

//     // const hud: BuilderHUD = new BuilderHUD();
//     // hud.attachToEntity(walldivider);

//     const walldividera = new Entity("walldivider");
//     walldividera.addComponent(new DeathItem())
//     engine.addEntity(walldividera);
//     walldividera.addComponent(dividerShape);
//     walldividera.addComponent(
//       new Transform({
//         position: new Vector3(12, 30.1, 0.4),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1, 1.7, 1),
//       }) 
//     );

//     const walldivider2a = new Entity("walldivider");
//     walldivider2a.addComponent(new DeathItem())
//     engine.addEntity(walldivider2a);
//     walldivider2a.addComponent(dividerShape);
//     walldivider2a.addComponent(
//       new Transform({
//         position: new Vector3(12,30.1,3.7),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1, 1.7, 1),
//       }) 
//     );


//     const walldivider3a = new Entity("walldivider");
//     walldivider3a.addComponent(new DeathItem())
//     engine.addEntity(walldivider3a);
//     walldivider3a.addComponent(dividerShape);
//     walldivider3a.addComponent(
//       new Transform({
//         position: new Vector3(12,30.1,7),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider4a = new Entity("walldivider");
//     walldivider4a.addComponent(new DeathItem())
//     engine.addEntity(walldivider4a);
//     walldivider4a.addComponent(dividerShape);
//     walldivider4a.addComponent(
//       new Transform({
//         position: new Vector3(12,30.1,10.3),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider5a = new Entity("walldivider");
//     walldivider5a.addComponent(new DeathItem())
//     engine.addEntity(walldivider5a);
//     walldivider5a.addComponent(dividerShape);
//     walldivider5a.addComponent(
//       new Transform({
//         position: new Vector3(12,30.1,13.6),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider6a = new Entity("walldivider");
//     walldivider6a.addComponent(new DeathItem())
//     engine.addEntity(walldivider6a);
//     walldivider6a.addComponent(dividerShape);
//     walldivider6a.addComponent(
//       new Transform({
//         position: new Vector3(27,30.1,26),
//         rotation: Quaternion.Euler(0, 90, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider7a = new Entity("walldivider");
//     walldivider7a.addComponent(new DeathItem())
//     engine.addEntity(walldivider7a);
//     walldivider7a.addComponent(dividerShape);
//     walldivider7a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,26),
//         rotation: Quaternion.Euler(0, 90, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider8a = new Entity("walldivider");
//     walldivider8a.addComponent(new DeathItem())
//     engine.addEntity(walldivider8a);
//     walldivider8a.addComponent(dividerShape);
//     walldivider8a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,26),
//         rotation: Quaternion.Euler(-180, 0, -180),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider9a = new Entity("walldivider");
//     walldivider9a.addComponent(new DeathItem())
//     engine.addEntity(walldivider9a);
//     walldivider9a.addComponent(dividerShape);
//     walldivider9a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,26),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider10a = new Entity("walldivider");
//     walldivider10a.addComponent(new DeathItem())
//     engine.addEntity(walldivider10a);
//     walldivider10a.addComponent(dividerShape);
//     walldivider10a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,29.3),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider11a = new Entity("walldivider");
//     walldivider11a.addComponent(new DeathItem())
//     engine.addEntity(walldivider11a);
//     walldivider11a.addComponent(dividerShape);
//     walldivider11a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,29.3),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider12a = new Entity("walldivider");
//     walldivider12a.addComponent(new DeathItem())
//     engine.addEntity(walldivider12a);
//     walldivider12a.addComponent(dividerShape);
//     walldivider12a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,32.7),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider13a = new Entity("walldivider");
//     walldivider13a.addComponent(new DeathItem())
//     engine.addEntity(walldivider13a);
//     walldivider13a.addComponent(dividerShape);
//     walldivider13a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,36),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider14a = new Entity("walldivider");
//     walldivider14a.addComponent(new DeathItem())
//     engine.addEntity(walldivider14a);
//     walldivider14a.addComponent(dividerShape);
//     walldivider14a.addComponent(
//       new Transform({
//         position: new Vector3(23.6,30.1,39.3),
//         rotation: Quaternion.Euler(0, -90, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider15a = new Entity("walldivider");
//     walldivider15a.addComponent(new DeathItem())
//     engine.addEntity(walldivider15a);
//     walldivider15a.addComponent(dividerShape);
//     walldivider15a.addComponent(
//       new Transform({
//         position: new Vector3(51.6,30.1,18.3),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );

    
//     const walldivider16a = new Entity("walldivider");
//     walldivider16a.addComponent(new DeathItem())
//     engine.addEntity(walldivider16a);
//     walldivider16a.addComponent(dividerShape);
//     walldivider16a.addComponent(
//       new Transform({
//         position: new Vector3(44.6,30.1,44.3),
//         rotation: Quaternion.Euler(0, 90, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider17a = new Entity("walldivider");
//     walldivider17a.addComponent(new DeathItem())
//     engine.addEntity(walldivider17a);
//     walldivider17a.addComponent(dividerShape);
//     walldivider17a.addComponent(
//       new Transform({
//         position: new Vector3(34.6,30.1,76.3),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider18a = new Entity("walldivider");
//     walldivider18a.addComponent(new DeathItem())
//     engine.addEntity(walldivider18a);
//     walldivider18a.addComponent(dividerShape);
//     walldivider18a.addComponent(
//       new Transform({
//         position: new Vector3(44.7,30.1,40.9),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider19a = new Entity("walldivider");
//     walldivider19a.addComponent(new DeathItem())
//     engine.addEntity(walldivider19a);
//     walldivider19a.addComponent(dividerShape);
//     walldivider19a.addComponent(
//       new Transform({
//         position: new Vector3(44.8,30.1,37.6),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     const walldivider20a = new Entity("walldivider");
//     walldivider20a.addComponent(new DeathItem())
//     engine.addEntity(walldivider20a);
//     walldivider20a.addComponent(dividerShape);
//     walldivider20a.addComponent(
//       new Transform({
//         position: new Vector3(30.3,30.1,26),
//         rotation: Quaternion.Euler(0, 0, 0),
//         scale: new Vector3(1,1.7,1),
//       }) 
//     );


//     // const walldivider27a = new Entity("walldivider");
//     // walldivider27a.addComponent(new DeathItem())
//     // engine.addEntity(walldivider27a);
//     // walldivider27a.addComponent(resources.models.walldivider);
//     // walldivider27a.addComponent(
//     //   new Transform({
//     //     position: new Vector3(24.1,0.1,79),
//     //     rotation: Quaternion.Euler(0, -90, 0),
//     //     scale: new Vector3(1,1.7,1),
//     //   }) 
//     // );
    

//     //const hud: BuilderHUD = new BuilderHUD();
//     // hud.attachToEntity(anpuartifact);
//     //hud.attachToEntity(walldivider27a);
//     // hud.attachToEntity(walldivider14);
//     // hud.attachToEntity(walldivider15);
//     // hud.attachToEntity(walldivider16);
//     // hud.attachToEntity(walldivider17);
//     // hud.attachToEntity(walldivider18);
//     // hud.attachToEntity(walldivider19); 
//     // hud.attachToEntity(walldivider20);

    
//   }

//   unloadScene() {
//     const items = engine.getComponentGroup(DeathItem);
//     while (items.entities.length) {
//       engine.removeEntity(items.entities[0]);
//     }
//   }
// }
