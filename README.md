# t1t5-server

## Install
```
git clone https://github.com/avtyul/t1t5-s3rv3r
cd t1t5-s3rv3r
npm i
npm start
```

Also, u need mongodb.

## API

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

## Authors
avtyul, KasyanDiGris
