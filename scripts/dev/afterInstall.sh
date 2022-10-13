#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export HOME="/home/$HOME/"

cd /var/www/html/picnic-webapp
/usr/bin/npm install && /usr/bin/npm run build:dev && cp -R ./build/* ./pro-build/
