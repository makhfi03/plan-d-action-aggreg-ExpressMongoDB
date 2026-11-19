# plan-d-action-aggreg-ExpressMongoDB

# Rapport de TP : Analyser l'activité d'un centre de prêt avec MongoDB
**Base de données :** `pl_aggregations`  
**Outil :** MongoDB 7.0 / mongosh  

---

## 🛠️ Configuration & Environnement

### 1. Démarrage de MongoDB
La base de données MongoDB s'exécute dans un conteneur Docker :
```bash
docker run -d --name mongo-pl -p 27017:27017 mongo:7.0
```

### 2. Initialisation des données (Seed)
Le script `seed.mongosh.js` réinitialise les quatre collections :
```bash
Get-Content seed.mongosh.js | docker exec -i mongo-pl mongosh "mongodb://127.0.0.1:27017/pl_aggregations"
```

### 3. Contrôle des volumes
* `db.members.countDocuments()` = **4**
* `db.equipments.countDocuments()` = **6**
* `db.loans.countDocuments()` = **14**
* `db.maintenance.countDocuments()` = **8**

---