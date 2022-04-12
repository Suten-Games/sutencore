#!/bin/ksh

cp -R sounds $INIT_CWD
cp -R models $INIT_CWD
cp -R images $INIT_CWD

if [[ ! -d $INIT_CWD/src ]];then
  mkdir $INIT_CWD/src
fi

cp suten.ts $INIT_CWD
cp tsconfig.json $INIT_CWD

cp -R src/resources.ts $INIT_CWD/src
cp -R src/components $INIT_CWD/src
cp -R src/gameFunctions $INIT_CWD/src
cp -R src/gameObjects $INIT_CWD/src
cp -R src/gameSystems $INIT_CWD/src
cp -R src/gameUI $INIT_CWD/src
cp -R src/gameUtils $INIT_CWD/src
cp -R src/modules $INIT_CWD/src

grep 'entity.setParent(_scene)' $INIT_CWD/src/game.ts
rc=$?
if [[ ${rc} == 0 ]];then
  echo "Game.ts is from builder, copy contents to basescene"
  touch $INIT_CWD/src/baseScene.ts
  echo "export class BaseScene extends Entity {" >> $INIT_CWD/src/baseScene.ts 
    echo "constructor() {" >> $INIT_CWD/src/baseScene.ts
    echo "super()" >> $INIT_CWD/src/baseScene.ts
    echo "engine.addEntity(this)" >> $INIT_CWD/src/baseScene.ts
    echo " " >> $INIT_CWD/src/baseScene.ts
    cat $INIT_CWD/src/game.ts >> $INIT_CWD/src/baseScene.ts
    echo " " >> $INIT_CWD/src/baseScene.ts 
    echo "}" >> $INIT_CWD/src/baseScene.ts  
    echo "}" >> $INIT_CWD/src/baseScene.ts  
  cp src/game.ts $INIT_CWD/src/game.ts
else
  grep '/// --- Spawn a cube ---' $INIT_CWD/src/game.ts
  rc=$?
  if [[ ${rc} == 0 ]];then
    echo "This is a DCL init build"
    touch $INIT_CWD/src/baseScene.ts
    echo "export class BaseScene extends Entity {" >> $INIT_CWD/src/baseScene.ts 
    echo "constructor() {" >> $INIT_CWD/src/baseScene.ts
    echo "super()" >> $INIT_CWD/src/baseScene.ts
    echo "engine.addEntity(this)" >> $INIT_CWD/src/baseScene.ts
    echo " " >> $INIT_CWD/src/baseScene.ts
    cat $INIT_CWD/src/game.ts >> $INIT_CWD/src/baseScene.ts
    cp src/game.ts $INIT_CWD/src/game.ts
    echo " " >> $INIT_CWD/src/baseScene.ts 
    echo "}" >> $INIT_CWD/src/baseScene.ts  
    echo "}" >> $INIT_CWD/src/baseScene.ts 
  else 
    echo "Updating game.ts"
    cp -R src/game.ts $INIT_CWD/src/game.ts
  fi
fi

#npm install --save colyseus.js