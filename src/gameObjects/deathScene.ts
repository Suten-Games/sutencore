import { movePlayerTo } from "@decentraland/RestrictedActions";

import resources from "../resources";
//import { BuilderHUD } from "../modules/BuilderHUD";
import { DeathItem } from "../components/deathItemComponent";
import { SoundBox } from "../gameUtils/soundbox";

export class DeathScene extends Entity {
  // private entity1;
  // private entity1a;
  // private smoke1;
  // private smoke2;
  // private entity2;

  constructor() {
    super();
    engine.addEntity(this);

    const parcelsCountX = 5;
    const parcelsCountZ = 5;
    const groundShape = new GLTFShape("models/skullsandbones.glb");
    let smokeShape = resources.models.smokewavy;
    let outerwall = resources.models.duatwall;

    // let soundbox = new SoundBox(
    //   new Transform({ position: new Vector3(8, 0, 8) }),
    //   resources.sounds.deathzone,
    //   true
    // );
    // soundbox.addComponent(new DeathItem());
    // soundbox.play();

    for (let i = 0; i < parcelsCountX; i++) {
      for (let j = 0; j < parcelsCountZ; j++) {
        let lowground = new Entity();
        let lowsky = new Entity();
        lowground.addComponent(groundShape);
        lowground.addComponent(new DeathItem());
        lowsky.addComponent(resources.models.duatsky);
        lowsky.addComponent(new DeathItem());

        lowground.addComponent(
          new Transform({ position: new Vector3(i * 16 + 8, 0.1, j * 16 + 8) })
        );

        
        lowsky.addComponent(
          new Transform({ position: new Vector3(i * 16 + 8, 5.1, j * 16 + 8) })
        );

        engine.addEntity(lowground);
        engine.addEntity(lowsky);
      }
    }

   

    let leftwalli = 3.7;
    while (leftwalli < 79.6) {
      let leftwall = new Entity(); 
      leftwall.addComponent(resources.models.walldivider);
      leftwall.addComponent(new DeathItem());
      leftwall.addComponent(
        new Transform({ position: new Vector3(leftwalli, 0.1, 79.6),rotation: Quaternion.Euler(0, -90, 0), scale: new Vector3(1, 1.7, 1) })
      ); 
      leftwalli = leftwalli + 3.4
      engine.addEntity(leftwall)
    }

    let rightwalli = 3.7;
    while (rightwalli < 79.6) {
      let rightwall = new Entity(); 
      rightwall.addComponent(resources.models.walldivider);
      rightwall.addComponent(new DeathItem());
      rightwall.addComponent(
        new Transform({ position: new Vector3(rightwalli, 0.1, 0.4),rotation: Quaternion.Euler(0, -90, 0), scale: new Vector3(1, 1.7, 1) })
      ); 
      rightwalli = rightwalli + 3.4
      engine.addEntity(rightwall)
    }

    let centerwalli = 3.7;
    while (centerwalli < 65) {
      let centerwall = new Entity(); 
      centerwall.addComponent(resources.models.walldivider);
      centerwall.addComponent(new DeathItem());
      centerwall.addComponent(
        new Transform({ position: new Vector3(centerwalli, 0.1, 44.2),rotation: Quaternion.Euler(0, -90, 0), scale: new Vector3(1, 1.7, 1) })
      ); 
      centerwalli = centerwalli + 3.4
      engine.addEntity(centerwall)
    }

    let northwalli = 3.9;
    while (northwalli < 79.4) {
      let northwall = new Entity(); 
      northwall.addComponent(resources.models.walldivider);
      northwall.addComponent(new DeathItem());
      northwall.addComponent(
        new Transform({ position: new Vector3(0.4, 0.1, northwalli),rotation: Quaternion.Euler(180, 0, 180),scale: new Vector3(1, 1.7, 1) })
      ); 
      northwalli = northwalli + 3.4
      engine.addEntity(northwall)
    }

    let southwalli = 23.9;
    while (southwalli < 79.4) {
      let southwall = new Entity(); 
      southwall.addComponent(resources.models.walldivider);
      southwall.addComponent(new DeathItem());
      southwall.addComponent(
        new Transform({ position: new Vector3(79.5, 0.1, southwalli),rotation: Quaternion.Euler(180, 0, 180), scale: new Vector3(1, 1.7, 1) })
      ); 
      southwalli = southwalli + 3.4
      engine.addEntity(southwall)
    }

    let interiorwalli = 13.9;
    while (interiorwalli < 69.4) {
      let interiorwall = new Entity(); 
      interiorwall.addComponent(resources.models.walldivider);
      interiorwall.addComponent(new DeathItem());
      interiorwall.addComponent(
        new Transform({ position: new Vector3(34.7, 0.1, interiorwalli),rotation: Quaternion.Euler(180, 0, 180), scale: new Vector3(1, 1.7, 1) })
      ); 
      interiorwalli = interiorwalli + 3.4
      engine.addEntity(interiorwall)
    }


    const bonemound = new Entity("bonemound");
    bonemound.addComponent(new DeathItem())
    engine.addEntity(bonemound);
    bonemound.addComponent(resources.models.bonemound);
    bonemound.addComponent(
      new Transform({
        position: new Vector3(40, 0.1, 40),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1, 1, 1),
      }) 
    );

    const walldivider = new Entity("walldivider");
    walldivider.addComponent(new DeathItem())
    engine.addEntity(walldivider);
    walldivider.addComponent(resources.models.walldivider);
    walldivider.addComponent(
      new Transform({
        position: new Vector3(12,0.1, 0.4),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1, 1.7, 1),
      }) 
    );

    // const hud: BuilderHUD = new BuilderHUD();
    // hud.attachToEntity(walldivider);

    // const walldividera = new Entity("walldivider");
    // walldividera.addComponent(new DeathItem())
    // engine.addEntity(walldividera);
    // walldividera.addComponent(resources.models.walldivider);
    // walldividera.addComponent(
    //   new Transform({
    //     position: new Vector3(12, 30.1, 0.4),
    //     rotation: Quaternion.Euler(0, 0, 0),
    //     scale: new Vector3(1, 1.7, 1),
    //   }) 
    // );

    const walldivider2 = new Entity("walldivider");
    walldivider2.addComponent(new DeathItem())
    engine.addEntity(walldivider2);
    walldivider2.addComponent(resources.models.walldivider);
    walldivider2.addComponent(
      new Transform({
        position: new Vector3(12,0.1,3.7),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1, 1.7, 1),
      }) 
    );


    const walldivider3 = new Entity("walldivider");
    walldivider3.addComponent(new DeathItem())
    engine.addEntity(walldivider3);
    walldivider3.addComponent(resources.models.walldivider);
    walldivider3.addComponent(
      new Transform({
        position: new Vector3(12,0.1,7),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );


    const walldivider4 = new Entity("walldivider");
    walldivider4.addComponent(new DeathItem())
    engine.addEntity(walldivider4);
    walldivider4.addComponent(resources.models.walldivider);
    walldivider4.addComponent(
      new Transform({
        position: new Vector3(12,0.1,10.3),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );


    const walldivider5 = new Entity("walldivider");
    walldivider5.addComponent(new DeathItem())
    engine.addEntity(walldivider5);
    walldivider5.addComponent(resources.models.walldivider);
    walldivider5.addComponent(
      new Transform({
        position: new Vector3(12,0.1,13.6),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider6 = new Entity("walldivider");
    walldivider6.addComponent(new DeathItem())
    engine.addEntity(walldivider6);
    walldivider6.addComponent(resources.models.walldivider);
    walldivider6.addComponent(
      new Transform({
        position: new Vector3(27,0.1,26),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider7 = new Entity("walldivider");
    walldivider7.addComponent(new DeathItem())
    engine.addEntity(walldivider7);
    walldivider7.addComponent(resources.models.walldivider);
    walldivider7.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,26),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );


    const walldivider8 = new Entity("walldivider");
    walldivider8.addComponent(new DeathItem())
    engine.addEntity(walldivider8);
    walldivider8.addComponent(resources.models.walldivider);
    walldivider8.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,26),
        rotation: Quaternion.Euler(-180, 0, -180),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider9 = new Entity("walldivider");
    walldivider9.addComponent(new DeathItem())
    engine.addEntity(walldivider9);
    walldivider9.addComponent(resources.models.walldivider);
    walldivider9.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,26),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider10 = new Entity("walldivider");
    walldivider10.addComponent(new DeathItem())
    engine.addEntity(walldivider10);
    walldivider10.addComponent(resources.models.walldivider);
    walldivider10.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,29.3),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider11 = new Entity("walldivider");
    walldivider11.addComponent(new DeathItem())
    engine.addEntity(walldivider11);
    walldivider11.addComponent(resources.models.walldivider);
    walldivider11.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,29.3),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );
    

    const walldivider12 = new Entity("walldivider");
    walldivider12.addComponent(new DeathItem())
    engine.addEntity(walldivider12);
    walldivider12.addComponent(resources.models.walldivider);
    walldivider12.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,32.7),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider13 = new Entity("walldivider");
    walldivider13.addComponent(new DeathItem())
    engine.addEntity(walldivider13);
    walldivider13.addComponent(resources.models.walldivider);
    walldivider13.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,36),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider14 = new Entity("walldivider");
    walldivider14.addComponent(new DeathItem())
    engine.addEntity(walldivider14);
    walldivider14.addComponent(resources.models.walldivider);
    walldivider14.addComponent(
      new Transform({
        position: new Vector3(23.6,0.1,39.3),
        rotation: Quaternion.Euler(0, -90, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider15 = new Entity("walldivider");
    walldivider15.addComponent(new DeathItem())
    engine.addEntity(walldivider15);
    walldivider15.addComponent(resources.models.walldivider);
    walldivider15.addComponent(
      new Transform({
        position: new Vector3(51.6,0.1,18.3),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider16 = new Entity("walldivider");
    walldivider16.addComponent(new DeathItem())
    engine.addEntity(walldivider16);
    walldivider16.addComponent(resources.models.walldivider);
    walldivider16.addComponent(
      new Transform({
        position: new Vector3(44.6,0.1,44.3),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider17 = new Entity("walldivider");
    walldivider17.addComponent(new DeathItem())
    engine.addEntity(walldivider17);
    walldivider17.addComponent(resources.models.walldivider);
    walldivider17.addComponent(
      new Transform({
        position: new Vector3(34.6,0.1,76.3),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider18 = new Entity("walldivider");
    walldivider18.addComponent(new DeathItem())
    engine.addEntity(walldivider18);
    walldivider18.addComponent(resources.models.walldivider);
    walldivider18.addComponent(
      new Transform({
        position: new Vector3(44.7,0.1,40.9),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider19 = new Entity("walldivider");
    walldivider19.addComponent(new DeathItem())
    engine.addEntity(walldivider19);
    walldivider19.addComponent(resources.models.walldivider);
    walldivider19.addComponent(
      new Transform({
        position: new Vector3(44.8,0.1,37.6),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider20 = new Entity("walldivider");
    walldivider20.addComponent(new DeathItem())
    engine.addEntity(walldivider20);
    walldivider20.addComponent(resources.models.walldivider);
    walldivider20.addComponent(
      new Transform({
        position: new Vector3(30.3,0.1,26),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    const walldivider27a = new Entity("walldivider");
    walldivider27a.addComponent(new DeathItem())
    engine.addEntity(walldivider27a);
    walldivider27a.addComponent(resources.models.walldivider);
    walldivider27a.addComponent(
      new Transform({
        position: new Vector3(24.1,0.1,79),
        rotation: Quaternion.Euler(0, -90, 0),
        scale: new Vector3(1,1.7,1),
      }) 
    );

    

    //const hud: BuilderHUD = new BuilderHUD();
    // hud.attachToEntity(anpuartifact);
    //hud.attachToEntity(walldivider27a);
    // hud.attachToEntity(walldivider14);
    // hud.attachToEntity(walldivider15);
    // hud.attachToEntity(walldivider16);
    // hud.attachToEntity(walldivider17);
    // hud.attachToEntity(walldivider18);
    // hud.attachToEntity(walldivider19); 
    // hud.attachToEntity(walldivider20);


    let bwall = 8
    let iwall = 0
    let outwall = 0;
    while (outwall <= 80) {
      while (iwall <= 32) {
        while (bwall <= 72) {
          let owall = new Entity(); 
          owall.addComponent(outerwall);
          owall.addComponent(new DeathItem());
          owall.addComponent(
            new Transform({ position: new Vector3(bwall, iwall, outwall),rotation: Quaternion.Euler(0, 90, 0), scale: new Vector3(1, 1, 1) })
          ); 
          //log(`creating ${bwall} ${iwall} ${outwall}`)
          engine.addEntity(owall)
          bwall = bwall + 16
          
        }
        bwall = 8
        iwall = iwall + 16
      }
      bwall = 8
      iwall = 0
      outwall = outwall + 80
    }

    let bwallx = 80
    let iwallx = 16
    let outwallx = 8;
    while (outwallx <= 80) {
      while (iwallx <= 48) {
        let owall = new Entity(); 
        owall.addComponent(outerwall);
        owall.addComponent(new DeathItem());
        owall.addComponent(
          new Transform({ position: new Vector3(bwallx, iwallx, outwallx),rotation: Quaternion.Euler(-180, 0, 0), scale: new Vector3(1, 1, 1) })
        ); 
        //log(`creating ${bwallx} ${iwallx} ${outwallx}`)
        engine.addEntity(owall)
          
        //bwall = 8
        iwallx = iwallx + 16
      }
      iwallx = 16
      outwallx = outwallx + 16
    }

    let bwallz = 0
    let iwallz = 16
    let outwallz = 8;
    while (outwallz <= 80) {
      while (iwallz <= 48) {
        let owall = new Entity(); 
        owall.addComponent(outerwall);
        owall.addComponent(new DeathItem());
        owall.addComponent(
          new Transform({ position: new Vector3(bwallz, iwallz, outwallz),rotation: Quaternion.Euler(0, 0, -180), scale: new Vector3(1, 1, 1) })
        ); 
        //log(`creating ${bwallz} ${iwallz} ${outwallz}`)
        engine.addEntity(owall)
          
        //bwall = 8
        iwallz = iwallz + 16
      }
      iwallz = 16
      outwallz = outwallz + 16
    }

    
  }

  unloadScene() {
    const items = engine.getComponentGroup(DeathItem);
    while (items.entities.length) {
      engine.removeEntity(items.entities[0]);
    }
  }
}
