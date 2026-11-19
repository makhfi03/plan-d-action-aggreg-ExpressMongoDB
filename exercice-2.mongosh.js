// Exercice 2 — Quel matériel est le plus utilisé et le plus rentable ?
const pipeline = [
  
  {
    $match: {
      status: "RETURNED"
    }
  },
  
  {
    $lookup: {
      from: "equipments",
      localField: "equipmentId",
      foreignField: "_id",
      as: "equipment"
    }
  },
  
  {
    $unwind: "$equipment"
  },
  
  {
    $match: {
      "equipment.archived": false
    }
  },
  
  {
    $group: {
      _id: "$equipment.category",
      loanCount: { $sum: 1 },
      avgDays: { $avg: "$durationDays" },
      revenueCents: { $sum: "$feeCents" }
    }
  },
  
  {
    $project: {
      _id: 0,
      category: "$_id",
      loanCount: 1,
      averageDurationDays: { $round: ["$avgDays", 2] },
      revenueCents: 1
    }
  },
  
  {
    $sort: {
      revenueCents: -1,
      category: 1
    }
  }
];