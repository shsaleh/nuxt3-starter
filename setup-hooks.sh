#!/bin/bash

# Install Husky in submodules and link to main project hooks
git submodule foreach --quiet '
  # echo "Checking Husky setup in $sm_path"
  cd "$toplevel/$sm_path"
     pnpm i

  # # Check if Husky is already configured
  # if [ ! -d "./.husky" ]; then
  #   echo "Husky not configured, setting up Husky in $sm_path"

  #   # Ensure husky is installed
  #    pnpm add --save-dev husky

  #   # Install Husky
  #    pnpm exec husky init

  #   # Link submodule hooks to the main project"s hooks
  #    cp -ar "$toplevel/.husky/." "$toplevel/$sm_path/.husky/"
  #    echo "Husky hooks set up in $sm_path."
  # else
  #   echo "in else"
  # fi
'

echo "installation completed for all submodules."
