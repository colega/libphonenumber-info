#!/bin/bash
datetag=$(date +%Y%m%d-%H%M%S)
changeset=$(git rev-parse HEAD)
releasename="release-$datetag-$changeset"
docker run -it -w /libphonenumber-info -v $(pwd):/libphonenumber-info node npm run build
cp -r build $releasename
ln -sfT $releasename release
