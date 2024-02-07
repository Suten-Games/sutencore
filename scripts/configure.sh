#!/bin/sh

cp -R sounds $INIT_CWD
cp -R models $INIT_CWD
cp -R images $INIT_CWD
cp -R materials $INIT_CWD

if [ ! -d $INIT_CWD/src ]; then
  mkdir $INIT_CWD/src
fi

# Check if suten.ts exists
SUTEN_TS="$INIT_CWD/suten.ts"
if [ -f "$SUTEN_TS" ]; then
  # Extract existing values
  sutenBase=$(grep 'sutenBase' $SUTEN_TS | cut -d'=' -f2 | tr -d " ';")
  duatX=$(grep 'duatX' $SUTEN_TS | cut -d'=' -f2 | tr -d " ';")
  duatZ=$(grep 'duatZ' $SUTEN_TS | cut -d'=' -f2 | tr -d " ';")
  
  # Prepare the new suten.ts with the preserved values
  sed -i.bak "s/^export var sutenBase = .*$/export var sutenBase = '$sutenBase';/" suten.ts
  sed -i.bak "s/^export var duatX = .*$/export var duatX = $duatX;/" suten.ts
  sed -i.bak "s/^export var duatZ = .*$/export var duatZ = $duatZ;/" suten.ts

  # Cleanup backup files created by sed
  rm -f suten.ts.bak
fi

cp suten.ts $INIT_CWD
cp tsconfig.json $INIT_CWD

cp -R src/resources.ts $INIT_CWD/src
cp -R src/components $INIT_CWD/src
cp -R src/gameFunctions $INIT_CWD/src
cp -R src/gameObjects $INIT_CWD/src
cp -R src/gameServer $INIT_CWD/src
cp -R src/gameSystems $INIT_CWD/src
cp -R src/gameUI $INIT_CWD/src
cp -R src/gameUtils $INIT_CWD/src
cp -R src/modules $INIT_CWD/src

grep "class BaseScene" $INIT_CWD/src/baseScene.ts
rc=$?
if [ ${rc} == 0 ]; then
  echo "Base Scene exists, so use it"
  echo " " | tee -a $INIT_CWD/src/game.ts
  cat src/game.ts $INIT_CWD/src/game.ts
else
  grep 'entity.setParent(_scene)' $INIT_CWD/src/game.ts
  rc=$?
  if [ ${rc} == 0 ]; then
    echo "Game.ts is from builder, copy contents to basescene"
    touch $INIT_CWD/src/baseScene.ts
    echo "export class BaseScene extends Entity {" >>$INIT_CWD/src/baseScene.ts
    echo "constructor() {" >>$INIT_CWD/src/baseScene.ts
    echo "super()" >>$INIT_CWD/src/baseScene.ts
    echo "engine.addEntity(this)" >>$INIT_CWD/src/baseScene.ts
    echo " " >>$INIT_CWD/src/baseScene.ts
    cat $INIT_CWD/src/game.ts >>$INIT_CWD/src/baseScene.ts
    echo " " >>$INIT_CWD/src/baseScene.ts
    echo "}" >>$INIT_CWD/src/baseScene.ts
    echo "}" >>$INIT_CWD/src/baseScene.ts
    cp src/game.ts $INIT_CWD/src/game.ts
  else
    grep '/// --- Spawn a cube ---' $INIT_CWD/src/game.ts
    rc=$?
    if [ ${rc} == 0 ]; then
      echo "This is a DCL init build"
      touch $INIT_CWD/src/baseScene.ts
      echo "export class BaseScene extends Entity {" >>$INIT_CWD/src/baseScene.ts
      echo "constructor() {" >>$INIT_CWD/src/baseScene.ts
      echo "super()" >>$INIT_CWD/src/baseScene.ts
      echo "engine.addEntity(this)" >>$INIT_CWD/src/baseScene.ts
      echo " " >>$INIT_CWD/src/baseScene.ts
      cat $INIT_CWD/src/game.ts >>$INIT_CWD/src/baseScene.ts
      cp src/game.ts $INIT_CWD/src/game.ts
      echo " " >>$INIT_CWD/src/baseScene.ts
      echo "}" >>$INIT_CWD/src/baseScene.ts
      echo "}" >>$INIT_CWD/src/baseScene.ts
    else
      echo "Updating game.ts"
      cp -R src/game.ts $INIT_CWD/src/game.ts
      echo "This might be a DCL init build"
      touch $INIT_CWD/src/baseScene.ts
      echo "export class BaseScene extends Entity {" >>$INIT_CWD/src/baseScene.ts
      echo "constructor() {" >>$INIT_CWD/src/baseScene.ts
      echo "super()" >>$INIT_CWD/src/baseScene.ts
      echo "}" >>$INIT_CWD/src/baseScene.ts
      echo "}" >>$INIT_CWD/src/baseScene.ts
    fi
  fi
fi

#npm install --save colyseus.js
