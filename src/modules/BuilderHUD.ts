/////////////////////////////////
// BuilderHUD
// You are welcome to use any content from this open source scene in compliance with the license.
/*
Copyright 2019 Carl Fravel

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// For Instructions see the README.md in https://gitlab.com/dcl-tech/demo-builder-hub
// Notes: 
// The BuilderHUD has the concept of a default parent, initially null, but updated by use of setDefaultParent()
// If a new entity is added, it uses the defaultParent as its parent
// TODO xyz widget needs to always be rotated 180.  Maybe it is rotated 180 within a parent?  how does it come out in Dump?

export const BUILDER_HUD_EYE_HEIGHT = 1.755
export { BuilderHUD, BuilderHudEvent }

const ROTATION_SPEED = 100

@EventConstructor()
class BuilderHudEvent {
    constructor(public buttonName: string) { }
}


class BuilderHUD {
    defaultParent: Entity | null = null
    entities: { entity: Entity | null, transform: Transform, preexisting: boolean }[] = []
    selectedEntityIndex: number = -1 // index into this.entities of selected entity.  -1 means none yet selected.
    rotator: EntityRotator | null = null

    selectionPointer: Entity | null = null
    selectionPointerShape: Shape
    selectionPointerScale: number = 0.3
    selectionPointerElevation: number = 1 // how much the selection pointer is raised relative to the root of the selected object.
    // TODO provide a means to adjust its elevation, or to determine top of object and put it above that.
    newEntityShape: Shape | null = null
    newEntityScale: number = 1

    modePOSITION: number = 0
    modeROTATION: number = 1
    modeSCALE: number = 2
    mode: number = this.modePOSITION

    snap: number = 0
    snapPosScale: number = 1
    snapRot: number = 90

    canvas: UICanvas | null = null
    uiMinimizedContainer: UIContainerRect | null = null
    uiMaximizedContainer: UIContainerRect | null | null = null
    uiMaximized: boolean = false

    maximizeButton: UIImage | null = null

    qButton: UIImage | null = null
    wButton: UIImage | null = null
    eButton: UIImage | null = null

    aButton: UIImage | null = null
    sButton: UIImage | null = null
    dButton: UIImage | null = null

    modeButton: UIImage | null = null
    modeLabel: UIText | null = null
    snapButton: UIImage | null = null
    snapLabel: UIText | null = null

    selectPreviousButton: UIImage | null = null
    selectNextButton: UIImage | null = null
    discardItemButton: UIImage | null = null

    newEntitytButtonButton: UIImage | null = null
    saveButton: UIImage | null = null
    minimizeButton: UIImage | null = null

    eventManager: EventManager | null = null

    constructor() {
        // Camera bug workaround: do an initial read during init, so that the first "NewEntity" placement will not be 0,0,0
        let camera = Camera.instance
        let v: Vector3 = camera.position

        this.setupUI()
        this.selectionPointer = new Entity()
        try {
            this.selectionPointerShape = new GLTFShape("models/pointer/pointer.glb")
        }
        catch (e) {
            // user doesn't have the pointer mesh in the above path, so use a red box
            this.selectionPointerShape = new BoxShape()
            let mtl = new Material()
            mtl.albedoColor = Color3.Red()
            this.selectionPointer.addComponent(mtl)
        }
        this.selectionPointer.addComponent(this.selectionPointerShape)
        this.selectionPointer.addComponent(new Transform())
        this.rotator = new EntityRotator()
        this.rotator.setup(this.selectionPointer)
        engine.addSystem(this.rotator)
    }

    setDefaultParent(defaultParent: Entity) {
        this.defaultParent = defaultParent
    }

    setEventListener(eventManager: EventManager) {
        this.eventManager = eventManager
    }

    setupUI() {
        // load the image atlas
        let imageAtlas = "materials/builder-hud/builder-hud-atlas-1024.png"
        let imageTexture = new Texture(imageAtlas)

        // Create canvas component
        this.canvas = new UICanvas()
        this.canvas.hAlign = 'center'
        this.canvas.vAlign = 'bottom'
        //this.canvas.positionY = 100
        //this.canvas.positionX = 10

        //////////////////////// 
        // Minimized UI
        // Container
        this.uiMinimizedContainer = new UIContainerRect(this.canvas)
        this.uiMinimizedContainer.hAlign = 'right'
        this.uiMinimizedContainer.vAlign = 'bottom'
        //this.uiMinimizedContainer.adaptHeight = true
        //this.uiMinimizedContainer.adaptWidth = true
        this.uiMinimizedContainer.width = 70
        this.uiMinimizedContainer.height = 80
        this.uiMinimizedContainer.positionY = 100
        this.uiMinimizedContainer.positionX = 0
        this.uiMinimizedContainer.color = Color4.Black()
        //this.uiMinimizedContainer.stackOrientation = UIStackOrientation.VERTICAL

        // Label
        const minimizedLabel = new UIText(this.uiMinimizedContainer)
        minimizedLabel.value = 'Builder HUD'
        minimizedLabel.color = Color4.White()
        minimizedLabel.hAlign = 'right'
        minimizedLabel.vAlign = 'bottom'
        minimizedLabel.paddingLeft = 7
        minimizedLabel.paddingTop = 0
        minimizedLabel.paddingBottom = 5
        minimizedLabel.fontSize = 10
        // minimizedLabel.fontWeight = 'bold' // fontWeight was removed in ecs 6.7.0
        minimizedLabel.isPointerBlocker = false

        // Expand button
        this.maximizeButton = new UIImage(this.uiMinimizedContainer, imageTexture)
        this.maximizeButton.sourceLeft = 496
        this.maximizeButton.sourceTop = 128
        this.maximizeButton.sourceWidth = 128
        this.maximizeButton.sourceHeight = 128
        //this.maximizeButton.hAlign = 'left'
        //this.maximizeButton.vAlign = 'top'
        //this.maximizeButton.positionX = 5
        //this.maximizeButton.positionY = -5
        this.maximizeButton.hAlign = 'right'
        this.maximizeButton.vAlign = 'bottom'
        this.maximizeButton.positionX = -15
        this.maximizeButton.positionY = 30
        this.maximizeButton.width = 40
        this.maximizeButton.height = 40
        this.maximizeButton.isPointerBlocker = true
        this.maximizeButton.onClick = new OnClick(() => {
            this.maximizeUI()
        })

        //////////////////////// 
        // Maximized UI
        ///////////////////////

        // Container       
        this.uiMaximizedContainer = new UIContainerRect(this.canvas)
        this.uiMaximizedContainer.hAlign = 'right'
        this.uiMaximizedContainer.vAlign = 'bottom'
        //this.uiMaximizedContainer.adaptWidth = true
        //this.uiMaximizedContainer.adaptHeight = true
        this.uiMaximizedContainer.width = 155
        this.uiMaximizedContainer.height = 255
        this.uiMaximizedContainer.positionX = 0
        this.uiMaximizedContainer.positionY = 100
        this.uiMaximizedContainer.color = Color4.Black()
        //this.uiMaximizedContainer.stackOrientation = UIStackOrientation.VERTICAL

        // ROW 1
        // q button -z pos,scale; -z rot
        this.qButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.qButton.sourceLeft = 16
        this.qButton.sourceTop = 278
        this.qButton.sourceWidth = 74
        this.qButton.sourceHeight = 74
        this.qButton.hAlign = 'right'
        this.qButton.vAlign = 'bottom'
        this.qButton.positionX = -105
        this.qButton.positionY = 205
        this.qButton.width = 40
        this.qButton.height = 40
        this.qButton.isPointerBlocker = true
        this.qButton.onClick = new OnClick(() => {
            this.adjustTransform("q")
        })

        // w button  +y pos,scale; -x rot
        this.wButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.wButton.sourceLeft = 178
        this.wButton.sourceTop = 278
        this.wButton.sourceWidth = 74
        this.wButton.sourceHeight = 74
        this.wButton.hAlign = 'right'
        this.wButton.vAlign = 'bottom'
        this.wButton.positionX = -60
        this.wButton.positionY = 205
        this.wButton.width = 40
        this.wButton.height = 40
        this.wButton.isPointerBlocker = true
        this.wButton.onClick = new OnClick(() => {
            this.adjustTransform("w")
        })

        // e button  +z pos,scale; +y rot
        this.eButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.eButton.sourceLeft = 97
        this.eButton.sourceTop = 278
        this.eButton.sourceWidth = 74
        this.eButton.sourceHeight = 74
        this.eButton.hAlign = 'right'
        this.eButton.vAlign = 'bottom'
        this.eButton.positionX = -15
        this.eButton.positionY = 205
        this.eButton.width = 40
        this.eButton.height = 40
        this.eButton.isPointerBlocker = true
        this.eButton.onClick = new OnClick(() => {
            this.adjustTransform("e")
        })

        // ROW 2
        // a button -x pos,scale; +y rot
        this.aButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.aButton.sourceLeft = 16
        this.aButton.sourceTop = 278
        this.aButton.sourceWidth = 74
        this.aButton.sourceHeight = 74
        this.aButton.hAlign = 'right'
        this.aButton.vAlign = 'bottom'
        this.aButton.positionX = -105
        this.aButton.positionY = 160
        this.aButton.width = 40
        this.aButton.height = 40
        this.aButton.isPointerBlocker = true
        this.aButton.onClick = new OnClick(() => {
            this.adjustTransform("a")
        })

        // S button  -y pos,scale; +x rot
        this.sButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.sButton.sourceLeft = 259
        this.sButton.sourceTop = 278
        this.sButton.sourceWidth = 74
        this.sButton.sourceHeight = 74
        this.sButton.hAlign = 'right'
        this.sButton.vAlign = 'bottom'
        this.sButton.positionX = -60
        this.sButton.positionY = 160
        this.sButton.width = 40
        this.sButton.height = 40
        this.sButton.isPointerBlocker = true
        this.sButton.onClick = new OnClick(() => {
            this.adjustTransform("s")
        })

        // d button  +x pos,scale; -y rot
        this.dButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.dButton.sourceLeft = 97
        this.dButton.sourceTop = 278
        this.dButton.sourceWidth = 74
        this.dButton.sourceHeight = 74
        this.dButton.hAlign = 'right'
        this.dButton.vAlign = 'bottom'
        this.dButton.positionX = -15
        this.dButton.positionY = 160
        this.dButton.width = 40
        this.dButton.height = 40
        this.dButton.isPointerBlocker = true
        this.dButton.onClick = new OnClick(() => {
            this.adjustTransform("d")
        })


        // ROW 2.5 
        // Mode Button
        this.modeButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.modeButton.sourceLeft = 340
        this.modeButton.sourceTop = 453
        this.modeButton.sourceWidth = 74
        this.modeButton.sourceHeight = 74
        this.modeButton.hAlign = 'right'
        this.modeButton.vAlign = 'bottom'
        this.modeButton.positionX = -80
        this.modeButton.positionY = 125
        this.modeButton.width = 65
        this.modeButton.height = 30
        this.modeButton.isPointerBlocker = true
        this.modeButton.onClick = new OnClick(() => {
            this.mode += 1
            if (this.mode > this.modeSCALE)
                this.mode = this.modePOSITION
            this.snap = 0
            this.setSnaps()
            this.applyModeAndSnapLabels()
        })

        this.modeLabel = new UIText(this.modeButton)
        this.modeLabel.color = Color4.White()
        this.modeLabel.hAlign = 'right'
        this.modeLabel.vAlign = 'bottom'
        this.modeLabel.paddingTop = 0
        this.modeLabel.paddingBottom = 5
        this.modeLabel.paddingLeft = 5
        this.modeLabel.fontSize = 14
        // this.modeLabel.fontWeight = 'bold'// fontWeight was removed in ecs 6.7.0
        this.modeLabel.isPointerBlocker = false

        // snap Button
        this.snapButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.snapButton.sourceLeft = 340
        this.snapButton.sourceTop = 453
        this.snapButton.sourceWidth = 74
        this.snapButton.sourceHeight = 74
        this.snapButton.hAlign = 'right'
        this.snapButton.vAlign = 'bottom'
        this.snapButton.positionX = -15
        this.snapButton.positionY = 125
        this.snapButton.width = 55
        this.snapButton.height = 30
        this.snapButton.isPointerBlocker = true
        this.snapButton.onClick = new OnClick(() => {
            this.snap += 1
            if (this.snap > 3)
                this.snap = 0
            this.setSnaps()
            this.applyModeAndSnapLabels()
        })

        this.snapLabel = new UIText(this.snapButton)
        this.snapLabel.color = Color4.White()
        this.snapLabel.hAlign = 'right'
        this.snapLabel.vAlign = 'bottom'
        this.snapLabel.paddingTop = 0
        this.snapLabel.paddingBottom = 5
        this.snapLabel.paddingLeft = 10
        this.snapLabel.fontSize = 14
        // this.snapLabel.fontWeight = 'bold'// fontWeight was removed in ecs 6.7.0
        this.snapLabel.isPointerBlocker = false

        // call this during setup to get the mode and snap buttons labelled initially
        this.applyModeAndSnapLabels()

        // ROW 3
        // Select Previous button
        this.selectPreviousButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.selectPreviousButton.sourceLeft = 16
        this.selectPreviousButton.sourceTop = 278
        this.selectPreviousButton.sourceWidth = 74
        this.selectPreviousButton.sourceHeight = 74
        this.selectPreviousButton.hAlign = 'right'
        this.selectPreviousButton.vAlign = 'bottom'
        this.selectPreviousButton.positionX = -105
        this.selectPreviousButton.positionY = 75
        this.selectPreviousButton.width = 40
        this.selectPreviousButton.height = 40
        this.selectPreviousButton.isPointerBlocker = true
        this.selectPreviousButton.onClick = new OnClick(() => {
            this.selectPrevious()
        })

        // Select Next button
        this.selectNextButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.selectNextButton.sourceLeft = 97
        this.selectNextButton.sourceTop = 278
        this.selectNextButton.sourceWidth = 74
        this.selectNextButton.sourceHeight = 74
        this.selectNextButton.hAlign = 'right'
        this.selectNextButton.vAlign = 'bottom'
        this.selectNextButton.positionX = -60
        this.selectNextButton.positionY = 75
        this.selectNextButton.width = 40
        this.selectNextButton.height = 40
        this.selectNextButton.isPointerBlocker = true
        this.selectNextButton.onClick = new OnClick(() => {
            this.selectNext()
        })

        // Discard this item button
        this.discardItemButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.discardItemButton.sourceLeft = 97
        this.discardItemButton.sourceTop = 454
        this.discardItemButton.sourceWidth = 74
        this.discardItemButton.sourceHeight = 74
        this.discardItemButton.hAlign = 'right'
        this.discardItemButton.vAlign = 'bottom'
        this.discardItemButton.positionX = -15
        this.discardItemButton.positionY = 75
        this.discardItemButton.width = 40
        this.discardItemButton.height = 40
        this.discardItemButton.isPointerBlocker = true
        this.discardItemButton.onClick = new OnClick(() => {
            this.discardSelected()
            // TODO added fortesting misc calls in other code
            if (this.eventManager != null) {
                this.eventManager.fireEvent(
                    new BuilderHudEvent("Discard")
                )
            }
        })

        // ROW 4
        // New Entity button
        this.newEntitytButtonButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.newEntitytButtonButton.sourceLeft = 258
        this.newEntitytButtonButton.sourceTop = 363
        this.newEntitytButtonButton.sourceWidth = 74
        this.newEntitytButtonButton.sourceHeight = 74
        this.newEntitytButtonButton.hAlign = 'right'
        this.newEntitytButtonButton.vAlign = 'bottom'
        this.newEntitytButtonButton.positionX = -105
        this.newEntitytButtonButton.positionY = 30
        this.newEntitytButtonButton.width = 40
        this.newEntitytButtonButton.height = 40
        this.newEntitytButtonButton.isPointerBlocker = true
        this.newEntitytButtonButton.onClick = new OnClick(() => {
            this.newEntity()
        })

        // Save button
        this.saveButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.saveButton.sourceLeft = 16
        this.saveButton.sourceTop = 454
        this.saveButton.sourceWidth = 74
        this.saveButton.sourceHeight = 74
        this.saveButton.hAlign = 'right'
        this.saveButton.vAlign = 'bottom'
        this.saveButton.positionX = -60
        this.saveButton.positionY = 30
        this.saveButton.width = 40
        this.saveButton.height = 40
        this.saveButton.isPointerBlocker = true
        this.saveButton.onClick = new OnClick(() => {
            this.dump()
        })

        // Minimize> button
        this.minimizeButton = new UIImage(this.uiMaximizedContainer, imageTexture)
        this.minimizeButton.sourceLeft = 496
        this.minimizeButton.sourceTop = 128
        this.minimizeButton.sourceWidth = 128
        this.minimizeButton.sourceHeight = 128
        this.minimizeButton.hAlign = 'right'
        this.minimizeButton.vAlign = 'bottom'
        this.minimizeButton.positionX = -15
        this.minimizeButton.positionY = 30
        this.minimizeButton.width = 40
        this.minimizeButton.height = 40
        this.minimizeButton.isPointerBlocker = true
        this.minimizeButton.onClick = new OnClick(() => {
            this.minimizeUI()
        })

        // ROW 5
        // HUD Caption
        const maximizedLabel = new UIText(this.uiMaximizedContainer)
        maximizedLabel.value = 'Builder HUD'
        maximizedLabel.color = Color4.White()
        maximizedLabel.hAlign = 'center'
        maximizedLabel.vAlign = 'bottom'
        maximizedLabel.paddingTop = 0
        maximizedLabel.paddingBottom = 5
        maximizedLabel.paddingLeft = 15
        maximizedLabel.fontSize = 14
        // maximizedLabel.fontWeight = 'bold'// fontWeight was removed in ecs 6.7.0
        maximizedLabel.isPointerBlocker = false

        // Now that it is all set up, minimize it
        this.minimizeUI()
    }

    setSnaps() {
        switch (this.snap) {
            case 0:
                this.snapPosScale = 1
                this.snapRot = 90
                break
            case 1:
                this.snapPosScale = 0.1
                this.snapRot = 15
                break
            case 2:
                this.snapPosScale = 0.01
                this.snapRot = 5
                break
            case 3:
                this.snapPosScale = 0.001
                this.snapRot = 1
                break
        }
    }
    applyModeAndSnapLabels() {
        if (this.modeLabel != null) {
            // Put the edit mode onto the button's label
            switch (this.mode) {
                case this.modePOSITION:
                    this.modeLabel.value = "Position"
                    break
                case this.modeROTATION:
                    this.modeLabel.value = "Rotation"
                    break
                case this.modeSCALE:
                    this.modeLabel.value = "Scale"
                    break
                default:
                    this.modeLabel.value = "ERR"

            }
        }

        if (this.snapLabel != null) {
            switch (this.snap) {
                case 0:
                    if (this.mode == this.modeROTATION) {
                        this.snapLabel.value = "90"
                    }
                    else {
                        this.snapLabel.value = "1"
                    }
                    break
                case 1:
                    if (this.mode == this.modeROTATION) {
                        this.snapLabel.value = "15"
                    }
                    else {
                        this.snapLabel.value = "0.1"
                    }
                    break
                case 2:
                    if (this.mode == this.modeROTATION) {
                        this.snapLabel.value = "5"
                    }
                    else {
                        this.snapLabel.value = "0.01"
                    }
                    break
                case 3:
                    if (this.mode == this.modeROTATION) {
                        this.snapLabel.value = "1"
                    }
                    else {
                        this.snapLabel.value = "0.001"
                    }
                    break
                default:
                    this.snapLabel.value = "ERR"

            }
        }

    }

    maximizeUI() {
        if (this.uiMinimizedContainer != null && this.uiMaximizedContainer != null) {
            this.uiMinimizedContainer.visible = false
            this.uiMaximizedContainer.visible = true
            this.uiMaximized = true
            if (this.selectedEntityIndex >= 0 && this.entities.length > 0 && this.selectionPointer != null) {
                engine.addEntity(this.selectionPointer)
            }
            this.mode = this.modePOSITION
            this.applyModeAndSnapLabels()
        }

    }
    minimizeUI() {
        if (this.uiMinimizedContainer != null && this.uiMaximizedContainer != null) {
            this.uiMaximizedContainer.visible = false
            this.uiMinimizedContainer.visible = true
            this.uiMaximized = false
            if (this.selectedEntityIndex >= 0 && this.entities.length > 0 && this.selectionPointer != null) {
                engine.removeEntity(this.selectionPointer)
            }
        }
    }
    showUI() {
        if (this.canvas != null) {
            this.canvas.visible = true
            this.canvas.isPointerBlocker = true
        }
    }
    hideUI() {
        if (this.canvas != null) {
            this.canvas.visible = false
            this.canvas.isPointerBlocker = false
        }
    }
    selectEntity(selectedEntityIndex: number) {
        if (this.entities.length == 0) {
            // there are no entities at all, new or existing
            if (this.selectionPointer != null) {
                engine.removeEntity(this.selectionPointer)
            }
            this.selectedEntityIndex = selectedEntityIndex
            return
        }
        if (this.selectionPointer != null && this.rotator != null) {
            let e: Entity | null = this.entities[selectedEntityIndex].entity
            if (e != null) {
                this.selectedEntityIndex = selectedEntityIndex
                // todo why does this report to the console: 
                //    "warning, added an entity with a parent not present in the engine."
                this.selectionPointer.setParent(this.entities[selectedEntityIndex].entity)
                //if (!this.uiMaximized) { // when you set the entity's parent, the entity is added to the engine if the parent is already added 
                //    engine.removeEntity(this.selectionPointer)  // TODO will this ever occur when pointer isn't in engine?
                //}
                let selectedEntityTransform: Transform = e.getComponent(Transform)
                //let y = selectedEntityTransform.position.y + this.selectionPointerElevation/this.entities[selectedEntityIndex].transform.scale.y
                let y = this.selectionPointerElevation // this.entities[selectedEntityIndex].transform.scale.y
                //CF TODO if we ever want to align the pointer with the object, e.g. if not rotating it, then find better way, because this one ties the parent entity and pointer entity's rotations together:
                //this.selectionPointer.addComponentOrReplace(new Transform({position:new Vector3(selectedEntityTransform.position.x, selectedEntityTransform.position.y+this.selectionPointerElevation, selectedEntityTransform.position.z), rotation: selectedEntityTransform.rotation}))
                let t = new Transform({
                    position: new Vector3(0, y, 0),
                    scale: new Vector3( // compensate for any scale changes the selected (parent) entity may have on the pointer scale
                        this.selectionPointerScale / this.entities[selectedEntityIndex].transform.scale.x,
                        this.selectionPointerScale / this.entities[selectedEntityIndex].transform.scale.y,
                        this.selectionPointerScale / this.entities[selectedEntityIndex].transform.scale.z,
                    )
                })
                this.selectionPointer.addComponentOrReplace(t)
                // adding/removing it from engine is done with maximimizing/minimizing HUD
                this.rotator.setup(this.selectionPointer)
            }
        }
    }


    selectPrevious() {
        if (this.selectedEntityIndex > 0)
            this.selectEntity(this.selectedEntityIndex - 1)
    }
    selectNext() {
        if (this.selectedEntityIndex < this.entities.length - 1)
            this.selectEntity(this.selectedEntityIndex + 1)

    }
    discardSelected() {
        if (this.entities.length == 0) {
            log("BuilderHUD: no entity to delete")
        }
        else {
            let e: Entity | null = this.entities[this.selectedEntityIndex].entity
            // don't delete a  prrexisting entity
            if (e == null) {
                log("BuilderHUD: error, trying to discard an entity which shouldn't be null but is")
            }
            else {
                if (this.entities[this.selectedEntityIndex].preexisting) {
                    log("BuilderHUD: won't delete an existing scene entity")
                }
                else {
                    // delete the current entity that is a new xyz pos/rotation indicator
                    e.setParent(null)
                    engine.removeEntity(e)
                    // build a new entities array without this discarded new entity, and replace this.entities with it.
                    let newEntities: { entity: Entity | null, transform: Transform, preexisting: boolean }[] = []
                    for (let i in this.entities) {
                        if (+i < this.selectedEntityIndex) {
                            // copy the entities before the selected one
                            newEntities.push(this.entities[i])
                        }
                        // skip the deleted one
                        if ((+i > this.selectedEntityIndex) && (+i <= this.entities.length - 1)) {
                            // copy the next later one, if there is a next later one
                            newEntities.push(this.entities[i])
                        }
                    }
                    this.entities = newEntities
                    if (this.selectedEntityIndex <= this.entities.length - 1) {
                        // deleted entity was not the last one, so selecting entity at the same index
                        this.selectEntity(this.selectedEntityIndex)
                    }
                    else {
                        // deleted entity was last, so selecting previous entity
                        this.selectPrevious()
                    }
                }
            }
        }
    }

    adjustTransform(key: string) {
        let e: Entity | null = this.entities[this.selectedEntityIndex].entity
        if (e != null) {
            let transform = e.getComponent(Transform)
            switch (this.mode) {
                case this.modePOSITION:
                    let position = transform.position
                    switch (key) {
                        case "a":
                            position.x -= this.snapPosScale
                            break
                        case "s":
                            position.y -= this.snapPosScale
                            break
                        case "d":
                            position.x += this.snapPosScale
                            break
                        case "q":
                            position.z -= this.snapPosScale
                            break
                        case "w":
                            position.y += this.snapPosScale
                            break
                        case "e":
                            position.z += this.snapPosScale
                            break
                        default:
                            break
                    }
                    break
                case this.modeROTATION:

                    switch (key) {
                        case "a":
                            transform.rotate(Vector3.Up(), -this.snapRot)
                            break
                        case "s":
                            transform.rotate(Vector3.Left(), this.snapRot)
                            break
                        case "d":
                            transform.rotate(Vector3.Up(), this.snapRot)
                            break
                        case "q":
                            transform.rotate(Vector3.Forward(), -this.snapRot)
                            break
                        case "w":
                            transform.rotate(Vector3.Left(), -this.snapRot)
                            break
                        case "e":
                            transform.rotate(Vector3.Forward(), this.snapRot)
                            break
                        default:
                            break

                    }
                    break
                case this.modeSCALE:
                    let scale = transform.scale
                    switch (key) {
                        case "a":
                            scale.x -= this.snapPosScale
                            break
                        case "s":
                            scale.y -= this.snapPosScale
                            break
                        case "d":
                            scale.x += this.snapPosScale
                            break
                        case "q":
                            scale.z -= this.snapPosScale
                            break
                        case "w":
                            scale.y += this.snapPosScale
                            break
                        case "e":
                            scale.z += this.snapPosScale
                            break
                        default:
                            break
                    }
                    break
                default:
                    break
            }
        }


    }

    attachToEntity(entity: Entity, preexisting: boolean = true) {
        if (entity == null) {
        }
        else {
            this.entities.push({ entity: entity, transform: entity.getComponent(Transform), preexisting: preexisting })
            if (preexisting) {
                if (this.selectedEntityIndex = -1) {
                    this.selectEntity(0) // first preexisting entity will be selected, until we start adding new entities, or the user selects other entities
                }
            }
            else {
                // if new entities are added they should be selected
                this.selectEntity(this.entities.length - 1)
            }
        }
    }
    newEntity() {
        // set the new object to be at the camera's location but at Y=0
        let camera = Camera.instance
        //log ("Camera pos =", camera.position, " rotation =", camera.rotation.eulerAngles)  
        // set the new object's rotation in Y to be same as camera's
        let camRotY: number = camera.rotation.eulerAngles.y
        // DCL requires 180 rotation from the coordinate system of Blender
        if (camRotY >= 180)
            camRotY -= 180
        else
            camRotY += 180

        let pX: number = 0
        let pY: number = 0
        let pZ: number = 0
        let pRX: number = 0
        let pRY: number = 0
        let pRZ: number = 0
        let pSX: number = 1
        let pSY: number = 1
        let pSZ: number = 1

        if (this.defaultParent != null) {
            let pTransform = this.defaultParent.getComponent(Transform)
            pX = pTransform.position.x
            pY = pTransform.position.y
            pZ = pTransform.position.z
            pRX = pTransform.rotation.eulerAngles.x
            pRY = pTransform.rotation.eulerAngles.y
            pRZ = pTransform.rotation.eulerAngles.z
            pSX = pTransform.scale.x
            pSY = pTransform.scale.y
            pSZ = pTransform.scale.z
        }

        //let tscale:number = Math.sqrt(pSX^2 + pSY^2)

        let t = new Transform({
            //            position:new Vector3(camera.position.x-(pSX+1)*pX, 0-(pSY+1)*pY, camera.position.z-(pSZ+1)*pZ),
            //TODO must remove the parent rotation from the postions, as well as the scale.
            position: new Vector3((camera.position.x - pX) / pSX, (camera.position.y - pY - BUILDER_HUD_EYE_HEIGHT) / pSY, (camera.position.z - pZ) / pSZ),
            rotation: Quaternion.Euler(0, 0, 0),
            //rotation: Quaternion.Euler(0, 0, 0), 
            //scale:new Vector3(this.newEntityScale, this.newEntityScale, this.newEntityScale)
            scale: new Vector3(this.newEntityScale / pSX, this.newEntityScale / pSY, this.newEntityScale / pSZ)
            //scale:new Vector3(this.newEntityScale/tscale, this.newEntityScale/tscale, this.newEntityScale/tscale)
        })
        // adjust Widget from Blender coordinates to DCL coordinates
        // t.rotate(Vector3.Up(), 180) // not needed to get the model facing "north" when the cam rot is applied

        // adjust Widet's rotation in Y for the Camera rotation around y, but not the other rotations
        t.rotate(Vector3.Up(), camRotY)

        // adjust Widget for the defaultParent's rotation
        //t.rotate(Vector3.Up(),pRY) // CF TODO zzz review how to compensate for parent's rotation

        let e = new Entity()
        e.name = "spawn"
        e.addComponent(t)

        if (this.newEntityShape == null) {
            //load the placement widget the first time it is needed
            try {
                this.newEntityShape = new GLTFShape("models/xyz/xyzLeftHand.glb")
            }
            catch (err) {
                // user doesn't have the pointer mesh in the above path, so use a green box
                this.newEntityShape = new BoxShape()
                let mtl = new Material()
                mtl.albedoColor = Color3.Green()
                e.addComponent(mtl)
            }
        }
        e.addComponent(this.newEntityShape)
        if (this.defaultParent != null) {
            e.setParent(this.defaultParent)

        }
        engine.addEntity(e)
        this.attachToEntity(e, false)
    }
    round(n: number): number {
        return Math.floor((n + 0.00049) * 1000) / 1000
    }
    dump() {
        // Write the pseudo spawnEntity code for all the entities to the console
        let fullString: string = "\n--------------- BuilderHUD entities -------------\n"
        for (let i in this.entities) {
            let e: Entity | null = this.entities[i].entity
            let preexisting = this.entities[i].preexisting
            if (e != null && preexisting != null) {
                // let name = (this.entities[i].preexisting?("Existing"+(e.name == null)?"":("_"+e.name)):"spawn")
                let name: string = preexisting ? ("Existing" + ((e.name == "") ? "" : "_" + e.name)) : e.name as string
                let t = this.entities[i].transform
                let p = t.position
                let r = t.rotation.eulerAngles
                let s = t.scale
                let sX = s.x * (this.entities[i].preexisting ? 1 : 1 / this.newEntityScale)
                let sY = s.y * (this.entities[i].preexisting ? 1 : 1 / this.newEntityScale)
                let sZ = s.z * (this.entities[i].preexisting ? 1 : 1 / this.newEntityScale)
                let pstring: string = "" + this.round(p.x) + "," + this.round(p.y) + "," + this.round(p.z) + ",  " + this.round(r.x) + "," + this.round(r.y) + "," + this.round(r.z) + ",  " + this.round(sX) + "," + this.round(sY) + "," + this.round(sZ)
                fullString = fullString + name + "(" + pstring + ")\n"
            }
        }
        fullString += "-------------------------------------------------"
        log(fullString)
    }
    // destroy(){
    //     this.dump()
    //     //@CF TODO rework to preserve the preexisting entities in the list.
    //     for (let i in this.entities){
    //         let e:Entity|null = this.entities[i].entity
    //         if (e!=null){
    //             if (!this.entities[i].preexisting){
    //                 e.setParent(null)
    //                 engine.removeEntity(e)
    //                 this.entities[i].entity=null // should probaby be last reference to it, freeing its memory
    //             }
    //         }

    //     }
    //     this.entities = [] 
    //     this.numEntities=0
    //     this.refreshDisplay()
    // }

    refreshDisplay() {
        //TODO update the list of objects etc. in HUD
    }
}

class EntityRotator implements ISystem {
    rotatingEntity: Entity | null = null
    rotatingEntityParent: Entity | null = null
    firstUpdate: boolean = true

    constructor() {
    }

    setup(rotatingEntity: Entity) {
        this.rotatingEntity = rotatingEntity
    }
    update(dt: number) {
        if (this.firstUpdate) {
            this.firstUpdate = false
        }
        try {
            let e: Entity | null = this.rotatingEntity
            if (e != null) {
                let transform: Transform = e.getComponent(Transform)
                transform.rotate(Vector3.Up(), dt * ROTATION_SPEED)
            }
        }
        catch {
            // just do nothing.
        }
    }
}
