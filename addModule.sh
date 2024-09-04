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

# 4. Create the directory under 'layers'
cd "./layers"
git clone "$git_repo"

# 5. Navigate to the cloned repository directory
cd "$module_name"

# 6. Check if the 'develop' branch exists
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

# 7. Create 'locales' directory under the module directory
mkdir -p "./layers/$module_name/locales"

# 8. Iterate over files in 'libs/i18n/locales' and create files under 'locales' with predefined content
for file in ./libs/i18n/locales/*; do
    filename=$(basename "$file")
    echo "export default {
    test: 'Test',
    };" > "./layers/$module_name/locales/$filename"
done

# 9. Create 'nuxt.config.ts' under the module directory
echo "// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  i18n: {
locales: [" > "./layers/$module_name/nuxt.config.ts"

for file in ./layers/$module_name/locales/*; do
    locale_code="${file##*/}"  # Extracts filename (like 'en.ts')
    locale_code="${locale_code%.*}"  # Removes extension (like 'en')
    echo "    {
      code: '$locale_code',
      file: './locales/$locale_code.ts',
    }," >> "./layers/$module_name/nuxt.config.ts"
done

echo "  ],
  },
});" >> "./layers/$module_name/nuxt.config.ts"

# 10. Create 'pages' directory under the module directory
mkdir -p "./layers/$module_name/pages"

# 11. Initialize Git Flow with default configurations
cd layers/$module_name || exit

# 12. Run 'pnpm init' inside the module directory
pnpm init 

# 13. Install Husky and initialize it, then copy hooks from the main project
pnpm add --save-dev husky

cp -ra $SCRIPTPATH/.husky/. $SCRIPTPATH/layers/$module_name/.husky/

pnpm exec husky init

echo "Module '$module_name' successfully created and set up with Nuxt3."
