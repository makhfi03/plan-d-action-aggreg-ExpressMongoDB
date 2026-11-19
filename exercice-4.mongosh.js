// Exercice 4 — Où part le budget de maintenance ?
const pipeline = [
  {
    $match: {
      status: "DONE"
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
      completedInterventionsCount: { $sum: 1 },
      avgCost: { $avg: "$costCents" },
      totalCostCents: { $sum: "$costCents" }
    }
  },

  {
    $project: {
      _id: 0,
      category: "$_id",
      completedInterventionsCount: 1,
      averageCostCents: { $round: ["$avgCost", 2] },
      totalCostCents: 1
    }
  },

  {
    $sort: {
      totalCostCents: -1
    }
  }
];