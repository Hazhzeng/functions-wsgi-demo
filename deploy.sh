#!/bin/bash

PROJECT=Roject
PROJECT_ENV=RojectEnv

source ~/$PROJECT_ENV/bin/activate

cd ~/$PROJECT
pip install -r requirements.txt

npm install
npm run build

deactivate
