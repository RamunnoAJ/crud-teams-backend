# CRUD TEAMS BACKEND

This is a CRUD application of soccer teams. The application has the following features

- Create
- Read
- Update
- Delete

## TECHNOLOGIES

- Node.js
- Express
- Jest

## ENDPOINTS

- GET
  - `/api/teams` => get all teams
  - `/api/teams/:id` => get a team
  - `/api/public/uploads/:filename` => get a file
- POST
  - `/api/teams` => create a team
  - `/api/reset` => reset all teams
- PATCH
  - `/api/teams/:id` => update a team
- DELETE
  - `/api/teams/:id` => delete a team

## PROJECT STRUCTURE

- `data` => Directory that contains the data
  - `teams.json`
  - `teams-backup.json`
- `src` => Directory that contains the logic of the server
  - `app.js` => server
  - `routes` => handling of the http methods
    - `teams.js`
  - `api` => Directory that contains the logic of the api
    - `teams.js`
  - `entities` => Entities of the database
    - `teams.js`
  - `mappers` => Mappers to match data with entities
    - `teams.js`
- `public` => Directory that contains the static files
  - `uploads` => Directory that contains the uploaded files
    - `:filename`

## Run locally

1. Clone the repository

```bash
 git clone https://github.com/RamunnoAJ/crud-teams-backend.git
```

2. Move to the created directory

```bash
 cd crud-teams-backend
```

3. Run the command to install the dependencies

```bash
 npm install
```

4. Change the name of the file .env.example to .env and change the key's value

```bash
 KEY= => KEY=PAIR
```

5. Run the command to start the server locally

```bash
 npm run start
```

6. Open your browser and navigate to the URL with whatever PORT you want

```bash
 localhost:PORT
```
