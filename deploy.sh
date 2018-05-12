#!/bin/bash

PROJECT=Roject
PROJECT_ENV=RojectEnv

VERSION=$(git log --oneline | head -n 1 | cut -d' ' -f1)

source ~/$PROJECT_ENV/bin/activate

cd ~/$PROJECT
echo "$VERSION" > version.txt
pip install -r requirements.txt

npm install
npm run build

sudo systemctl restart roject

deactivate
