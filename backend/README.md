- I changed settings in django so that it works in docker

### Docker setup

```sh
docker-compose build # to build the containers
docker-compose up # to start containers
docker-compose up -d # to start containers in daemon mode: use this
```

- Now, go to [localhost:8000](localhost:8000) and check if you can see the django running, else database docker was not setup correctly

- run `docker-compose down` to stop containers and try building and running them again. If it did not work, reach out to me.

### Django configuration

- We need to apply migrations.

```docker-compose run web python manage.py migrate```

- Run groups setup

```sh
docker-compose run web python group.py
```

- We need to create a super user to login into [admin site](localhost:8000/admin) (we can view all the data in here). **IMP:** use id = 1 while creating superuser

```sh
docker-compose run web python manage.py createsuperuser
```
