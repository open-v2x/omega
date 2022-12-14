#! /bin/bash

FILE_PATH=/var/www/omega/js

for file_name in $(ls $FILE_PATH |grep "edge_event_rsi_detail.*.js")
do
  file=${FILE_PATH}/${file_name}
  sed -i "s#AMAPKEY#${MAP_KEY}#g" "$file"
done

for file_name in $(ls $FILE_PATH |grep "center_cloud.*.js")
do
  file=${FILE_PATH}/${file_name}
  sed -i "s#AMAPKEY#${MAP_KEY}#g" "$file"
done

for file_name in $(ls $FILE_PATH |grep "center_map.*.js")
do
  file=${FILE_PATH}/${file_name}
  sed -i "s#MQTTURL#${MQTT_URL}#g" "$file"
  sed -i "s#MQTTPATH#${MQTT_PATH}#g" "$file"
  sed -i "s#MQTTUSERNAME#${MQTT_USERNAME}#g" "$file"
  sed -i "s#MQTTPASSWORD#${MQTT_PASSWORD}#g" "$file"
done

./docker-entrypoint.sh

nginx -g "daemon off;"
