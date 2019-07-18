# skadmin-vue

skadmin the source code of front-end

#### The source code of the project

|     |   the source code of backend  |   the source code of front-end  |
|---  |--- | --- |
|  github   |  https://github.com/DengSinkiang/skadmin   |  https://github.com/DengSinkiang/skadmin-vue   |

#### The front-end template


Initial template: [https://github.com/PanJiaChen/vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

Template document: [https://panjiachen.github.io/vue-element-admin-site/zh/guide/](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)

#### Build Setup
``` bash
# Installation dependency
npm install

# Start service localhost:8013
npm run dev

# Build production environment (production environment package, so this command does not need to be executed)
npm run build
```
```
# nginx If you have not installed nginx, please install it yourself
server {
    listen       80;
    server_name  your url # www.rbac.com;

    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    location / {
        proxy_pass http://127.0.0.1:8013;
        proxy_connect_timeout 600;
        proxy_read_timeout 600;
    }

}
server {
    listen       80;
    server_name  api url # api.rbac.com;

    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_connect_timeout 600;
        proxy_read_timeout 600;
    }

}
# Edit prod.env.js
BASE_API: '"api url # http://api.rbac.com"'
```
