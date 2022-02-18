# Arregro DRF-React.js

## [DEPLOYED LIVE](arregro.herokuapp.com)

This project idea is a copy of my [another project](https://github.com/sashasergeev/arregro-django) made with just Django.

***Description from my other version of this project:***
>On the news page users can see cards with info of the last posts and prices before and after news. Also they can press info button to open modal where they can see how price has changed after a news in a 1h 2h and change with the current price. On the coins page they can find the coin they want, follow them and go to the coin detail page, where they can see all the news that are in a db.
>
>Users can login/signup, follow/unfollow coins so they will have personal feed. Also user can submit the coin they want to see in the project.


### **Keypoints**
- In this project i didn't install react app as a separate project, instead i have installed it via django app (frontend app).
- The authentication and authorization is made with the help of ***Django Rest Knox***.

### **What different from [plain django version](https://github.com/sashasergeev/arregro-django)**
- Tech stack.
- Reworked tags page - now there are stats about tags, like avg %.
- On the main page user can filter posts by tags and date.
- User Notifications - whenever a coin that user is following gets new post, user receives notificaion.
- Whenever new post is created, user can see an alert bar on main page powered by WebSockets.
- Added alerts on user actions (follow coin, authenticaion...).
- Skeleton Loading. 
- Plot on coin detail page with price, volume, github activity, 1 year range.
- ...
#
## **Technologies used:**
### **Frontend**
```
HTML
CSS
React.js
React-Query
Material UI
React Modals
* requests from frontend is made by axios
```
### **Backend**

```
Django Framework
Django Rest Framework
MySQL
Redis (for celery)

Libraries:
- Celery - for making background tasks 
- Channels - to send actual prices through WebSockets
- Django rest knox - Auth
- django-heroku
```
#   

## **Deployment on heroku**

 The server that was used for deploying is [Daphne](https://github.com/django/daphne). This server is ASGI and is needed for Django  Channels to work.

Heroku has some dyno limitations user can use on free plan, so in order for Celery to work i had to use [Honcho](https://honcho.readthedocs.io/en/latest/), which enabled to run multiple python processes in a single dyno. Its settings is in ```ProcfileHoncho``` file.

#

## **Instruction to run this project**

1. You need to dl/clone this repository to your device.
2. Activate your virtualenv.
3. Run ```pip install -r requirements.txt``` in your shell.
4. Download redis server to your computer, install and connect it in ```cna/settings.py```.
5. Connect your database in ```cna/settings.py```.
6. Run migraions: type in your shell ```python manage.py makemigrations``` and ```python manage.py migrate```.
7. Run ```python manage.py runserver``` in your shell.
8. To run celery, you need to run these two commands:
```
celery -A arregro beat -l INFO
celery -A arregro worker --loglevel=INFO --concurrency 1 -P solo
```

### If you want to change anything on frontend you need to

1. Go to ***frontend*** folder.
2. Type in shell ```npm install``` so all packages you need will be installed.
3. After you make changes, you need to run ```npm run dev``` command in the shell to compile main.js file.

Need to notice, the script, that look up the news is separeted from the site. It runs and sends data to the api. [Link to the repository](https://github.com/sashasergeev/telegram-realtime-crawler/tree/api)
