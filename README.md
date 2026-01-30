# Gestion des Taches - Projet Ecole

Application MERN pour gerer les taches de groupe a l'ecole.

## Structure

```
MERN/
├── backend/
│   ├── config/db.js
│   ├── controllers/tacheController.js
│   ├── models/Tache.js
│   ├── routes/tacheRoutes.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── services/
        └── App.js
```

## Comment lancer

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Notes
- Le backend tourne sur http://localhost:5000
- Le frontend tourne sur http://localhost:3000
- Faut avoir MongoDB installe et lance sur localhost:27017
