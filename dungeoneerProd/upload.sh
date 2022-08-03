#! /bin/bash

sftp -i dungeoneer.pem ubuntu@52.47.58.114 <<**
put docker-compose.yml
bye
**