# This script is used to generate a new index for a tweak.

case $1 in
    "create-tweak")
        mkdir -p public/tweaks/$2/x32
        index=$(jq -n '[inputs] | max_by(.index).index' public/tweaks/*/tweak.json)
        index=$((index + 1))
        echo "{\"index\": $index, \"title\": \"$4\", \"description\": \"$5\", \"category\": \"$3\", \"author\": {\"name\": \"$6\"}}" > public/tweaks/$2/tweak.json

    ;;
    *)
        echo "Usage: do.sh create-tweak ID CATEGORY TITLE DESCRIPTION AUTHOR"
    ;;
esac
