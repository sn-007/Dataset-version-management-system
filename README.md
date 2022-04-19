# Group 1 Team 5

### Publishing datasets and versions (Python)

| PROPERTY       | VALUE                                     |
| -------------- | ----------------------------------------- |
| TEAM NUMBER    | 22                                        |
| PROJECT NUMBER | 24                                        |
| PROJECT NAME   | Publishing datasets and versions (Python) |
| PROJECT TYPE   | Web-Python                                |
| STUDENT-1      | SWAMY NAIDU                               |
| STUDENT-2      | ANVITA REDDY                              |
| STUDENT-3      | HARSHA PATHURI                            |
| TA MENTOR      | YASHWANTH BALIVADA                        |



**WHAT IT IS:**

* A basic versioning GUI for displaying the versions and changes in all  the datasets deployed on the site.
* The end product should be a dynamic website where all the functionalities should work smoothly

**FUNCTIONAL REQUIREMENTS:** 

* Any user should be able to see the versions of all available datasets.
* A clean UI for previewing the dataset and the dataset metadata , describing 
  * what it is 
  * Date of release
  * Published by
  * Last updated
  * List of versions 
* For  a person to make any changes he should be the published of that particular dataset and should be authenticated.
* Any user can view and download the available datasets with various available versions
* We have to keep track of all the versions of a dataset that are releaed on the website, from DAY-1
* For all the versions of a dataset, there should be meta data document that holds the following information:
  * Edit name (commit name)
  * Date of Publishing
  * Edit Message (commit message)
  * User-ID of the person who is creating the version

**DELIVERABLES:**

* Code base
* Deployed version of the Application (**hopefully**)

**TECH STACK**

* We will use **React/flutter** for the frontend
* For managing the backend, we will use **FLASK** 
* For storing the data, we will use Mongo DB
* We will use AWS(free tier) with NGNIX for deployment
* React can be deployed easily using **GIT-HUB**


**RESOURCES**

* Quick revision of required technology's documentation 
* https://ipt.gbif.org/manual/en/ipt/2.5/versioning
* https://distributed.dask.org/en/stable/publish.html

**RELATED PROJECTS**

* Publishing versions of models and studies (Python) 
* Standard analytics on datasets (Python)
* End-user search queries on datasets (NoSQL)
* Private dataset access work flow (Python)

```sh
cd backend
sudo chown -R $USER:$USER db
docker-compose build # build containers
docker-compose up -d # start containers -d for daemon
docker-compose down # stop containers
```