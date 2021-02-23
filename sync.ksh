#!/bin/ksh

fromdir=$1
todir=$2
rootdir=/Users/saxis/dev/decentraland_projects

if [[ -z "${fromdir}" ]];then
  echo "Please specify a source directory for the sync: './sync \"Source\" \"Destination\"'"
  ls -l $rootdir
  exit 1
fi

if [[ -z "${todir}" ]];then
  echo "Please specify a destination directory for the sync: './sync \"Source\" \"Destination\"'"
  ls -l $rootdir
  exit 2
fi

echo "Copying materials from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/materials ]];then
  cp -Rp ${rootdir}/${fromdir}/materials ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/materials ${rootdir}/${todir}/materials
fi

echo "Copying models from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/models ]];then
  cp -Rp ${rootdir}/${fromdir}/models ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/models ${rootdir}/${todir}/models
fi

echo "Copying components from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/components ]];then
  cp -Rn ${rootdir}/${fromdir}/src/components ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/components ${rootdir}/${todir}/src/components
fi

echo "Copying gameObjects from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/gameObjects ]];then
  cp -Rn ${rootdir}/${fromdir}/src/gameObjects ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/gameObjects ${rootdir}/${todir}/src/gameObjects
fi

echo "Copying images from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/images ]];then
  cp -Rp ${rootdir}/${fromdir}/src/images ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/images ${rootdir}/${todir}/src/images
fi

echo "Copying modules from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/modules ]];then
  cp -Rp ${rootdir}/${fromdir}/src/modules ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/modules ${rootdir}/${todir}/src/modules
fi

echo "Copying npcs from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/npcs ]];then
  cp -Rp ${rootdir}/${fromdir}/src/npcs ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/npcs ${rootdir}/${todir}/src/npcs
fi

echo "Copying quests from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/quests ]];then
  cp -Rp ${rootdir}/${fromdir}/src/quests ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/quests ${rootdir}/${todir}/src/quests
fi

echo "Copying ui from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/ui ]];then
  cp -Rp ${rootdir}/${fromdir}/src/ui ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/ui ${rootdir}/${todir}/src/ui
fi

echo "Copying utils from ${fromdir} to ${todir}"
if [[ -d ${rootdir}/${todir}/src/utils ]];then
  cp -Rp ${rootdir}/${fromdir}/src/utils ${rootdir}/${todir}
else
  cp -Rp ${rootdir}/${fromdir}/src/utils ${rootdir}/${todir}/src/utils
fi

echo "Copying resources from ${fromdir} to ${todir}"
cp -Rp ${rootdir}/${fromdir}/src/resources.ts ${rootdir}/${todir}/src/resources.ts

echo "Game.ts purity check"
grep 'entity.setParent(_scene)' ${rootdir}/${todir}/src/game.ts
rc=$?
if [[ ${rc} == 0 ]];then
  echo "Game.ts is from builder, copy contents to basescene"
  cp -Rp ${rootdir}/${todir}/src/gameObjects/emptybaseScene.ts ${rootdir}/${todir}/src/baseScene.ts
  echo " " >> ${rootdir}/${todir}/src/baseScene.ts
  echo " COPIED FROM ORIGINAL game.ts" >> ${rootdir}/${todir}/src/baseScene.ts
  echo " " >> ${rootdir}/${todir}/src/baseScene.ts
  cat ${rootdir}/${todir}/src/game.ts >> ${rootdir}/${todir}/src/baseScene.ts
  echo "Copying game.ts"
  cp -Rp ${rootdir}/${fromdir}/src/game.ts ${rootdir}/${todir}/src/game.ts
  echo "MANUAL FIX!!!! Go to ${rootdir}/${todir}/src/gameObjects and fix baseScene.ts"
else
  echo "Updating game.ts"
  cp -Rp ${rootdir}/${fromdir}/src/game.ts ${rootdir}/${todir}/src/game.ts
fi
