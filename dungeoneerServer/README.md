# Dungeoneer server

## uploading to the production server

You'll see I've got two separate Dockerfiles. this is because calling `npm install` every time you want to push a new image is very time consuming, and sometimes you just want to push a quick change, and you know that no new modules have been added.

If you do add a new module (or if this is the first time you're pushing), first you need to run `./buildBase.sh`, which will create a new image based on node that copies the package.json file and runs `npm install --omit=dev`. It also copies over the relevant files from dungeoneerCommon

then `upload.sh` simple copies over the files from `dist` using the base image, then pushes the result to docker hub (be sure to sign in first).

Maybe we should compile the typescript separately, but seeing as testing is done directly on the ts files, and doesn't appear in the dist folder, I reckon the dist folder is already production ready (environment variables can shift behaviour accordingly). Let me know if that's a terrible idea