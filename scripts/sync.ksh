#!/bin/ksh

echo "Syncing from RuinsOfSaqqara"

# Define the base source directory for clarity and easy maintenance
base_src_dir="/Users/saxis/dev/sutengames/scenes/RuinsOfSaqqara/src"

# Move to the target src directory
cd ../src
echo "Now in the src directory... copying files"

# List all the directories to copy from
directories_to_copy=(
    "components"
    "gameFunctions"
    "gameObjects"
    "gameServer"
    "gameSystems"
    "gameUI"
    "gameUtils"
    "modules"
)

# Loop through each directory and copy its contents
for dir in "${directories_to_copy[@]}"; do
    echo "Copying $dir..."
    cp "${base_src_dir}/${dir}"/* "$dir"/
done

# Copy individual files
echo "Copying individual files..."
cp "${base_src_dir}/resources.ts" .
cp "${base_src_dir}/game.ts" .

echo "Sync complete."
