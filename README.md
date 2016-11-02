# t1t5-server

## Install
```
git clone https://github.com/avtyul/t1t5-s3rv3r
cd t1t5-s3rv3r
npm i
npm start
```

Also, u need mongodb.

```
# for Ubuntu
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo nano /etc/systemd/system/mongodb.service
```
Paste
```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```
go
```
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

# API

## login

### POST /login
Получение токена
```
{
    "login": "qwerty"
    "password": "qwerty"
}
```
Возвращает токен при соответсвии логина и пароля
```
{
    "token": "token"
}
```

## features

### GET /features
Возвращает массив фич.
```
[
    {
        "_id": "id",
        "action": "action",
        "type": "type",
        "icon": "icon",
        "__v": 0
    },
    {
        "_id": "id",
        "action": "action",
        "type": "type",
        "icon": "icon",
        "__v": 0
    }
]
```

### POST /features
Добавляет новую фичу
```
{
    "data": {
        "action": "action",
        "type": "type",
        "icon": "icon"
    },
    "token": "token"
}
```
Возвращает id фичи
```
{
    "_id": "id"
}
```

### GET /features/:id
Возвращает конкретную фичу
```
{
    "_id": "id",
    "action": "action",
    "type": "type",
    "icon": "icon",
    "__v": 0
}
```

### PUT /features/:id
Изменяет конкретную фичу
```
{
    "data": {
        "action": "newaction",
        "type": "newtype",
        "icon": "newicon"
    },
    "token": "token"
}
```
Возвращает id фичи
```
{
    "_id": "id"
}
```

### DELETE /features/:id
Удаляет конкретную фичу
```
{
    "token": "token"
}
```
Возвращает ОК
```
"OK"
```
## devices

### GET /devices
Возвращает массив девайсов.
```
[
    {
        "_id": "id",
        "deviceName": "deviceName",
        "deviceId": "deviceId",
        "registrationId": "registrationId",
        "__v": 0
    },
    {
        "_id": "id",
        "deviceName": "deviceName",
        "deviceId": "deviceId",
        "registrationId": "registrationId",
        "__v": 0
    }
]
```

### POST /devices
Добавляет новый девайс
```
{
    "data": {
        "deviceName": "deviceName",
        "deviceId": "deviceId",
        "registrationId": "registrationId"
    },
    "token": "token"
}
```
Возвращает id девайса
```
{
    "_id": "id"
}
```

### GET /features/:id
Возвращает конкретный девайс
```
{
    "_id": "id",
    "deviceName": "deviceName",
    "deviceId": "deviceId",
    "registrationId": "registrationId",
    "__v": 0
}
```

### DELETE /features/:id
Удаляет конкретный девайс
```
{
    "token": "token"
}
```

# Authors
avtyul, KasyanDiGris
