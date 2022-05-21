#!/usr/bin/env bash 

# for f in $FILE
# do
#   echo $f
#   echo "processing $f file ..."
#   cat "$f"
# done

for i in {1..20}
do 
  echo $i
  jp2a frame-$i.jpg > $i.txt
done
