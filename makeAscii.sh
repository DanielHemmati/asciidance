#!/usr/bin/env bash 

# for f in $FILE
# do
#   echo $f
#   echo "processing $f file ..."
#   cat "$f"
# done

for i in ./frames/*.jpg
do 
  jp2a *.jpg > a.txt
done
