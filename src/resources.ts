export default {
    sounds: {
        coins: new AudioClip("sounds/coins.mp3"),
        backpack: new AudioClip("sounds/backpack.mp3"),
        levelup: new AudioClip("sounds/levelup.mp3"),
        abouttodie: new AudioClip("sounds/abouttodie.mp3"),
        goblinHit: new AudioClip("sounds/goblin_hit.mp3"),
        punch: new AudioClip("sounds/punch.mp3"),
        playerHit: new AudioClip("sounds/player_hit.mp3"),
        playerHit2: new AudioClip("sounds/player_hit2.mp3"),
        fighterhit: new AudioClip("sounds/fighterhit.mp3"),
        killping: new AudioClip("sounds/killping.mp3"),
        orclaugh: new AudioClip("sounds/orclaugh.mp3"),
        deathzone: new AudioClip("sounds/deathzone.mp3"),
        orkish1: new AudioClip("sounds/sharath.mp3"),
        orkish2: new AudioClip("sounds/riseofempire.mp3"),
        orkish3: new AudioClip("sounds/redstorm.mp3"),
        orkish4: new AudioClip("sounds/ogre-dragons.mp3"),
        orkish5: new AudioClip("sounds/northwind.mp3"),
        orkish6: new AudioClip("sounds/kronn.mp3"),
        orkish7: new AudioClip("sounds/hammerhold.mp3"),
        orkish8: new AudioClip("sounds/gor.mp3"),
        orkish9: new AudioClip("sounds/dominionreforged.mp3"),
        orkish10: new AudioClip("sounds/blackmarch.mp3"),
        playerdeath: new AudioClip("sounds/playerdeath.mp3"),
        shopkeeper: new AudioClip("sounds/shopkeeper.mp3"),
        victory: new AudioClip("sounds/2015-08-18_-_Victory_-_David_Fesliyan.mp3"),
        sheathsword: new AudioClip("sounds/sheathsword.mp3"),
        corkpop: new AudioClip("sounds/corkpop.mp3"),
        wardspell: new AudioClip("sounds/279103-Magic-Game-Protection-Ward-Buff.wav"),
        elementalspell: new AudioClip("sounds/407875-Elemental_-Good_Cast_Single_Protection-5.wav"),
        rainspell: new AudioClip("sounds/rain-06.mp3"),
        snowspell: new AudioClip("sounds/snowstorm-01.mp3")
    },
    animations: {
        riversWalkClip: new AnimationState("walking"),
        turnRClip: new AnimationState("rightTurn"),
        turnLClip: new AnimationState("turnLeft")
    },
    models: {
        bigrocks: new GLTFShape("models/bigrocks.glb"),
        smallrocks: new GLTFShape("models/smallrocks.glb"),
        birchtree: new GLTFShape("models/birchtree.glb"),
        pinetree: new GLTFShape("models/pinetree.glb"),
        box: new GLTFShape("models/box.glb"),
        staticobjects: new GLTFShape("models/static_objects_glb.glb"),
        animatedleaves: new GLTFShape("models/leaves_falling_glb.glb"),
        lantern: new GLTFShape("models/lantern_glb.glb"),
        pyramid_bottom: new GLTFShape("models/pyramid_bottom_section_glb.glb"),
        pyramid_top: new GLTFShape("models/pyramid_top_section_glb.glb"),
        pyramid_sand: new GLTFShape("models/pyramid_ground_section_glb.glb"),
        pyramid_rocks: new GLTFShape("models/pyramid_rocks_glb.glb"),
        flag1: new GLTFShape("models/small_flag01_glb.glb"),
        flag2: new GLTFShape("models/small_flag02_glb.glb"),
        flag3: new GLTFShape("models/big_flag_glb.glb"),
        grasstile: new GLTFShape("models/FloorBaseGrass_01/FloorBaseGrass_01.glb"),
        grassblades: new GLTFShape("models/grass_glb.glb"),
        skullsandbones: new GLTFShape("models/skullsandbones.glb"),
        duatsky: new GLTFShape("models/duatsky.glb"),
        orcgrunt: new GLTFShape("models/orc-grunt.glb"),
        orcpeon: new GLTFShape("models/orc-peon.glb"),
        orcwarrior: new GLTFShape("models/orc-warrior-sword.glb"),
        oldanpu: new GLTFShape("models/anpu.glb"),
        anpu: new GLTFShape("models/anpu.glb"),
        peasant: new GLTFShape("models/peasant1.glb"),
        medjaywarrior: new GLTFShape("models/remetch-warrior10.glb"),
        remetchmage: new GLTFShape("models/remetchmagician1.glb"),
        remetchrogue: new GLTFShape("models/rogue1.glb"),
        redpeasant: new GLTFShape("models/redpeasant.glb"),
        paladin: new GLTFShape("models/paladin8.glb"),
        orc_camp: new GLTFShape("models/orc_encampment_model.glb"),
        smoke1: new GLTFShape("models/smoke_animated_01.glb"),
        smoke2: new GLTFShape("models/smoke_animated_02.glb"),
        smokewavy: new GLTFShape("models/smoke_01_waving_glb.glb"),
        fist: new GLTFShape("models/fist_punching_glb.glb"),
        potionshop: new GLTFShape("models/shop_model_glb.glb"),
        shoplight: new GLTFShape("models/shop_light.glb.glb"),
        duatlight: new GLTFShape("models/lantern.glb"),
        duatwall: new GLTFShape("models/blackwall.glb"),
        shopsmoke1: new GLTFShape("models/shop_smoke01_glb.glb"),
        shopsmoke2: new GLTFShape("models/shop_smoke02_glb.glb"),
        anpuartifact: new GLTFShape("models/death/anpu_artifact_glb.glb"),
        bonemound: new GLTFShape("models/death/mounds_bones_glb.glb"),
        walldivider: new GLTFShape("models/death/wall_diviver_glb.glb"),
        pyramid: new GLTFShape("models/mediumpyramid.glb"),
        largepyramid: new GLTFShape("models/largepyramid.glb"),
        merchantshop: new GLTFShape("models/merchantbuilding.glb"),
        spicebag1: new GLTFShape("models/floor2/Spicesbag_01/Spicesbag_01.glb"),
        spicebag2: new GLTFShape("models/floor2/Spicesbag_02/Spicesbag_02.glb"),
        spicebag3: new GLTFShape("models/floor2/Spicesbag_03/Spicesbag_03.glb"),
        longcrate: new GLTFShape("models/CrateLong_02/CrateLong_02.glb"),
        stairs: new GLTFShape("models/Stairs_L_01/Stairs_L_01.glb"),
        lanternLit: new GLTFShape('models/lantern_lit.glb'),
        ironChestTop: new GLTFShape('models/Chest_Top_Iron_01/Chest_Top_Iron_01.glb'),
        blackStone: new GLTFShape('models/Stone_Module_4M/Stone_Module_4M.glb'),
        wallStoneSmall: new GLTFShape("models/Wall_Stone_Small/Wall_Stone_Small.glb"),
        twoBladesOfGrassShape: new GLTFShape("models/Grass03.glb"),
        goblin: new GLTFShape("models/goblinAnimated3.glb"),
        fighter: new GLTFShape("models/FighterLadyAnimated3.glb"),
        sorceress: new GLTFShape("models/sorceressAnimated3.glb"),
        brute: new GLTFShape("models/BruteAnimated6.glb"),
        openBook: new GLTFShape("models/Book_06/Book_06.glb"),
        squareButton: new GLTFShape("models/Square_Button.glb"),
        peasantGirl: new GLTFShape('models/peasantAnimated.glb'),
        sackOfPotatoes: new GLTFShape("models/sackofpotatoes.glb"),
        woodTable: new GLTFShape("models/Table_Wood_01/Table_Wood_01.glb"),
        woodenDoor: new GLTFShape("models/Door_Wood_01/Door_Wood_01.glb"),
        stairFence: new GLTFShape('models/StairFence_01.glb'),
        wallStoneLarge: new GLTFShape('models/Wall_Stone_Large.glb'),
        outsideStairs: new GLTFShape('models/Module_Stair_Stones_3M/Module_Stair_Stones_3M.glb'),
        chairwood: new GLTFShape('models/floor2/Chairwood_02/Chairwood_02.glb'),
        tablewood: new GLTFShape('models/floor2/TableWood_01/TableWood_01.glb'),
        barrel: new GLTFShape('models/floor2/Barrel_01/Barrel_01.glb'),
        barrel2: new GLTFShape('models/floor2/Barrel_02/Barrel_02.glb'),
        plate: new GLTFShape('models/floor2/Plate_01/Plate_01.glb'),
        fishskeleton: new GLTFShape('models/floor2/FishSkeleton_01/FishSkeleton_01.glb'),
        dagger: new GLTFShape('models/floor2/Dagger_01/Dagger_01.glb'),
        bannerblue: new GLTFShape('models/floor2/Banner_Blue_02/Banner_Blue_02.glb'),
        bannerred: new GLTFShape('models/floor2/Banner_Red_02/Banner_Red_02.glb'),
        barricade: new GLTFShape('models/barricade.glb'),
    },
    loot: {
        greekSword: new Texture("images/looticons/greeksword.png"),
        sandBeetle: new Texture("images/looticons/sandbeetle.png"),
        rustysword: new Texture("images/looticons/rustysword.png"),
        rustyaxe: new Texture("images/looticons/rustyaxe.png"),
        rustydagger: new Texture("images/looticons/rustydagger.png"),
        orctooth: new Texture("images/looticons/orctooth.png"),
        redPotion: new Texture("images/looticons/redHealthPotion.png"),
        bluePotion: new Texture("images/looticons/blueHealthPotion.png"),
        greenPotion: new Texture("images/looticons/greenHealthPotion.png"),
        mana: new Texture("images/looticons/mana.png"),
        crackedstaff: new Texture("images/looticons/crackedstaff.png")
    },
    interface: {
        mageScreen: new Texture("images/vali/MageCharacterScreen.png"),
        warriorScreen: new Texture("images/vali/WarriorCharacterScreen.png"),
        berzerkerScreen: new Texture("images/vali/BerzerkerCharacterScreen.png"),
        rogueScreen: new Texture("images/vali/RogueCharacterScreen.png"),
        characterScreen: new Texture("images/vali/CharacterScreen.png"),
        blueActionBar: new Texture("images/vali/BlueActionbar.png"),
        blueBackpack: new Texture("images/vali/BlueBackpack.png"),
        blueLootWindow: new Texture("images/vali/BlueLootwindow.png"),
        blueMerchantInterface: new Texture("images/vali/BlueMerchantInterface.png"),
        khepra: new Texture("images/khepra.png"),
        buybutton: new Texture("images/dialogs/buybutton.png"),
        connectbutton: new Texture("images/dialogs/metamask.png"),
        combatlog: new Texture("images/vali/CombatLog.png"),
        closebutton: new Texture("images/vali/CloseButton.png"),
        equipButton: new Texture("images/equip_button.png"),
        discardButton: new Texture("images/discard_button.png"),
        scribeButton: new Texture("images/scribe_button.png"),
        characterButton: new Texture("images/character_button.png"),
        abandonButton: new Texture("images/vali/AbandonButton.png"),
        spellBook: new Texture("images/vali/SpellBook.png"),
        spellScroll: new Texture("images/spells/spellpage.png"),
        deleteSpell: new Texture("images/vali/DeleteSpell.png"),
        deleteSpellBG: new Texture("images/vali/DeleteSpellBG.png"),
        scrollUpBtn: new Texture("images/vali/cltop.png"),
        scrollDownBtn: new Texture("images/vali/clbottom.png"),
        questLog: new Texture("images/vali/QuestLogScreen.png"),
        questBook: new Texture("images/vali/questbook.png")
    }
}