
echo "installing charts!"

#declaring an array of names
declare -a names

names=(blog assets drafts content admin)

echo ${names[@]}
#running with for loop on the array and installing all the charts!
for i in ${names[@]}
do
    echo "${i}"
    helm install --values=./values/"${i}"-values.yaml "${i}" ./
done

echo "type helm ls to see all the charts"

helm ls --short

