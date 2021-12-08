echo "going to delete all the charts!s"
helm delete $(helm ls --short)