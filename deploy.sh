#!/bin/bash

PROJECT=pristine
PROJECT_ENV=env
SERVICE_NAME=prisined

VERSION=$(git log --oneline | head -n 1 | cut -d' ' -f1)

source ~/$PROJECT_ENV/bin/activate

cd ~/$PROJECT
echo "$VERSION" > version.txt
pip install -r requirements.txt

npm install --production
npm run build

sudo systemctl restart $SERVICE_NAME

deactivate