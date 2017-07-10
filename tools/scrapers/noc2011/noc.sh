wget -r 'http://noc.esdc.gc.ca/English/NOC/QuickSearch.aspx?ver=11&val65=*' \
    --accept-regex=Profile \
    --level=1 \
    --convert-links \
    --random-wait \
    --directory-prefix=./download \
    --cut-dirs=100

ts-node makeJson.ts

cp download/result.json ../../../src/data/canada/jobClass/noc2011.download.json
