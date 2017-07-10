root=$(pwd)
BUILD_ROOT="build"

find ${BUILD_ROOT} -type f -delete
mkdir -p ${BUILD_ROOT}/web
mkdir -p ${BUILD_ROOT}/server
mkdir -p ${BUILD_ROOT}/ssr

# Web contents
if [ $1 == "ssr" ]
then
    cd src/client/web
    node_modules/.bin/webpack --config ./webpack.config.js --watch &
    cd ${root}

    cd ${BUILD_ROOT}/web
    python -m http.server 8080 &
    cd ${root}
else
    cd src/client/web
    node --max_old_space_size=4096 node_modules/.bin/webpack-dev-server &
    cd ${root}
fi

# Server-side rendering script (optional)
if [ $1 == "ssr" ]
then
    cd src/client/ssr
    ../node_modules/.bin/webpack --config ./webpack.config.js --watch &
    cd ${root}
fi

# Server
nginx -s stop
if [ $1 == "ssr" ]
then
    nginx -c $(pwd)/tools/dev/nginx.ssr.conf
else
    nginx -c $(pwd)/tools/dev/nginx.webpack.conf
fi

# Database
mongod &

# Server script compilation
cd src/server
tsc --watch &
cd ${root}

# Backend Scripts
cp src/server/pm2.config.js ${BUILD_ROOT}/
cp src/data/canada/jobClass/noc2011.download.json ${BUILD_ROOT}/server/server/data
rsync -a src/server/node_modules ${BUILD_ROOT}/server
cd ${BUILD_ROOT}

echo "Waiting for backend scripts to be built..."
if [ $1 == "ssr" ]
then
    while [ ! -f "./ssr/render.bundle.js" ] || [ ! -f "./server/server/chat.js" ] || [ ! -f "./server/server/job.js" ]
    do
        sleep 0.5
        echo "waiting..."
    done
else
    while [ ! -f "./server/server/chat.js" ] || [ ! -f "./server/server/job.js" ]
    do

        sleep 0.5
        echo "waiting..."
    done
fi


echo "Starting PM2"
pm2 start pm2.config.js
pm2 logs
echo "YYY"

# Kill background processes on exit
kill $(jobs -p | awk '{ print $3 }')
pm2 kill
