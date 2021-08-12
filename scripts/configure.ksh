#!/bin/ksh

cp -R sounds $INIT_CWD
cp -R models $INIT_CWD
cp -R images $INIT_CWD

if [[ ! -d $INIT_CWD/src ]];then
  mkdir $INIT_CWD/src
fi

cp -R src/resources.ts $INIT_CWD/src
cp -R src/components $INIT_CWD/src
cp -R src/gameFunctions $INIT_CWD/src
cp -R src/gameObjects $INIT_CWD/src
cp -R src/gameSystems $INIT_CWD/src
cp -R src/gameUI $INIT_CWD/src
cp -R src/gameUtils $INIT_CWD/src

grep 'entity.setParent(_scene)' $INIT_CWD/src/game.ts
rc=$?
if [[ ${rc} == 0 ]];then
  echo "Game.ts is from builder, copy contents to basescene"
  touch $INIT_CWD/src/baseScene.ts
  cat $INIT_CWD/src/game.ts >> $INIT_CWD/src/baseScene.ts
  cp src/game.ts $INIT_CWD/src/game.ts
else
  grep '/// --- Spawn a cube ---' $INIT_CWD/src/game.ts
  rc=$?
  if [[ ${rc} == 0 ]];then
    echo "This is a DCL init build"
    touch $INIT_CWD/src/baseScene.ts
    cat $INIT_CWD/src/game.ts >> $INIT_CWD/src/baseScene.ts
    cp src/game.ts $INIT_CWD/src/game.ts
  else 
    echo "Updating game.ts"
    cp -R src/game.ts $INIT_CWD/src/game.ts
  fi
fi

# cp tsconfig.json $INIT_CWD

#cd $INIT_CWD
# npm i @dcl/ecs-scene-utils -B
# npm i @dcl/ui-scene-utils -B
# npm i @dcl/npc-scene-utils -B
# npm i @dcl/crypto-scene-utils  @dcl/ecs-scene-utils eth-connect -B
# npm i @dcl/l2-scene-utils @dcl/ecs-scene-utils eth-connect -B
# npm i @dcl/noise-utils -B