#!/bin/bash
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

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
# mkdir -p "./layers/$module_name"
# 11. Add the Git submodule
git submodule add -f "$git_repo" "./layers/$module_name" 


# 5. Create 'locales' directory under the module directory
mkdir -p "./layers/$module_name/locales"

# 6. Iterate over files in 'libs/i18n/locales' and create files under 'locales' with predefined content
for file in ./libs/i18n/locales/*; do
    filename=$(basename "$file")
    echo "export default {
    test: 'Test',
    };" > "./layers/$module_name/locales/$filename"
done

# 7. Create 'nuxt.config.ts' under the module directory
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

# 8. Create 'pages' directory under the module directory
mkdir -p "./layers/$module_name/pages"

# 12. Initialize Git Flow with default configurations
cd layers/$module_name || exit
git flow init -d

# 13. Switch to the 'develop' branch on the submodule
git checkout develop

# 9. Run 'pnpm init' inside the module directory
pnpm init 

# 10. Install Husky and initialize it, then copy hooks from the main project
pnpm add --save-dev husky

cp -ra $SCRIPTPATH/.husky/. $SCRIPTPATH/layers/$module_name/.husky/

pnpm exec husky init



echo "Module '$module_name' successfully created and set up with Nuxt3."
