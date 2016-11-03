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
    "login": "qwerty",
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
        "action": "action",
        "type": "type",
        "icon": "icon"
    },
    {
        "action": "action",
        "type": "type",
        "icon": "icon"
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
Возвращает action фичи
```
{
    "action": "action"
}
```

### GET /features/:action
Возвращает конкретную фичу
```
{
    "action": "action",
    "type": "type",
    "icon": "icon"
}
```

### PUT /features/:action
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
Возвращает action фичи
```
{
    "action": "action"
}
```

### DELETE /features/:action
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
        "deviceName": "deviceName",
        "deviceId": "deviceId",
        "registrationId": "registrationId"
    },
    {
        "deviceName": "deviceName",
        "deviceId": "deviceId",
        "registrationId": "registrationId"
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
Возвращает registrationId девайса
```
{
    "registrationId": "registrationId"
}
```

### GET /devices/:registrationId
Возвращает конкретный девайс
```
{
    "deviceName": "deviceName",
    "deviceId": "deviceId",
    "registrationId": "registrationId"
}
```

### DELETE /devices/:registrationId
Удаляет конкретный девайс
```
{
    "token": "token"
}
```
Возвращает ОК
```
"OK"
```

# Authors
avtyul, KasyanDiGris
