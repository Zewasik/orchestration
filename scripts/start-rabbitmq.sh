readonly CONTAINER_PORT=5672
readonly HOST_PORT=5672
readonly image_name="rabbitmq:3.13.0-rc.2-alpine"
readonly container_name=amqp.test

readonly check_image_exists=$(docker images -q $image_name)
readonly check_container_is_running=$(docker ps -q -f name="$container_name")
readonly check_container_is_stopped=$(docker ps -a -q -f name="$container_name")

if [[ -n "$check_container_is_running" ]]; then
    echo 'Container already exists and is running'
    exit 0
elif [[ -n "$check_container_is_stopped" ]]; then
    echo 'Container exists, but is stopped'
    docker start $container_name
    exit 0
fi

echo 'No such container'

if [[ -n "$check_image_exists" ]]; then
    echo 'Image exists'
    docker run -d --name $container_name -p $CONTAINER_PORT:$HOST_PORT $image_name
else
    echo 'No such image'
    docker pull $image_name
    docker run -d --name $container_name -p $CONTAINER_PORT:$HOST_PORT $image_name
fi
