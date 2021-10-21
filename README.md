# Arregro DRF-React.js

This project idea is a copy of my [another project](https://github.com/sashasergeev/arregro-django) made with just Django.

Description from my other version of this project:
>On the news page users can see cards with info of the last posts and prices before and after news. Also they can press info button to open modal where they can see how price has changed aftter a news in a 1h 2h and change with the current price. On the coins page they can find the coin they want, follow them and go to the coin detail page, where they can see all the news that are in a db.
>
>Users can login/signup, follow/unfollow coins so they will have personal feed. Also user can submit the coin they want to see in the project.

On the main page user can filter posts by tags.

### Keypoints
- In this project i didn't install react app as a separate project, instead i have installed it via django app (frontend app).
- The authentication and authorization is made with the help of ***Django Rest Knox***.

## Technologies used:
### Frontend
```
React.js
HTML
CSS
Material UI
React Modals
* requests from frontend is made by axios
```
### Backend
```
Django Framework
Django Rest Framework
MySQL
Redis (for celery)

Libraries:
- Celery - for making background tasks (api requests to CoinGecko to get actual prices)
- Channels - to send actual prices through WebSockets
- Django rest knox - Auth
```

## Instruction to run this project

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

Need to notice, the script, that look up the news is separeted from the site. It runs and writes data to the db (MySQL). [Link to the repository](https://github.com/sashasergeev/telegram-realtime-crawler)
