#!/usr/bin/env bash 


# mkdir ascii2
# for i in {1..20}
# do 
#   echo $i
#   jp2a ./frames/frame-$i.jpg > $i.txt
#   mv *.txt ./ascii2 
# done



# mkdir ascii2
# for filename in ./frames/*.jpg
# do 
#   echo $filename
#   jp2a filename > filename.txt
#   mv *.txt ./ascii2 
# done

cd frames
for filename in *.jpg 
do 
echo $filename
  jp2a filename --output=filename.txt
done 