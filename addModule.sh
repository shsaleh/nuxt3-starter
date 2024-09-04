#!/bin/bash
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# Check for the --just-clone option
just_clone=false
if [ "$1" == "--just-clone" ]; then
    just_clone=true
fi

# 1. Get the module name from the user
read -p "Enter the module name: " module_name

# 2. Check if the module already exists
if [ -d "./layers/$module_name" ]; then
    echo "Error: Module '$module_name' already exists."
    exit 1
fi

# 3. Get the git repository address from the user
read -p "Enter the git repository address: " git_repo

# 4. Ensure 'layers' directory exists and navigate into it
if [ ! -d "./layers" ]; then
    mkdir -p "./layers"
fi
cd "./layers" || exit 1

# 5. Clone the Git repository
git clone "$git_repo"

# 6. Navigate to the cloned repository directory
cd "$module_name"

# 7. Check if the 'develop' branch exists
if git rev-parse --verify develop &>/dev/null; then
    # If 'develop' branch exists, switch to it
    git checkout develop
else
    # If 'develop' branch does not exist, create and switch to it
    git checkout -b develop
fi

# If --just-clone option is provided, exit after cloning and switching/creating the branch
if [ "$just_clone" = true ]; then
    echo "Repository '$git_repo' has been cloned and switched to the 'develop' branch. Exiting as per --just-clone option."
    exit 0
fi

# 8. Create 'locales' directory under the module directory
mkdir -p "./layers/$module_name/locales"

# 9. Iterate over files in 'libs/i18n/locales' and create files under 'locales' with predefined content
for file in ./libs/i18n/locales/*; do
    filename=$(basename "$file")
    echo "export default {
    test: 'Test',
    };" > "./layers/$module_name/locales/$filename"
done

# 10. Create 'nuxt.config.ts' under the module directory
echo "// https://nuxt.com/docs/api/configuration/
