# Trybe-Task-List-Backend

# Requirements
* Linux / WSL Environment

# Setup
Clone the repo

If you prefere SSH:
```bash
git clone git@github.com:AlessandroFMello/trybe-task-list-backend.git
cd trybe-task-list-backend
```
If you prefere HTTP:
```bash
git clone https://github.com/AlessandroFMello/trybe-task-list-backend.git
cd trybe-task-list-frontend
```

Create your .env file accordingly to the provided .env.example file
```bash
cp .env.example .env
```

Install all the needed dependencies
```bash
npm install
```
or
```bash
npm i
```

Run prisma generate
```bash
npx prisma generate
```

Start the application backend and it will automagically setup prisma's configuration
```bash
npm start
```

Opening [http://localhost:3001/tasks](http://localhost:3001/tasks) should show you all the tasks


Opening [http://localhost:3001/tasks/:id](http://localhost:3001/tasks/:id) should show you the task by id

Now you`re good to go