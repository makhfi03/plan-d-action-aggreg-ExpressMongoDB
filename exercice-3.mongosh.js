// Exercice 3 — Quelles villes ont les membres les plus actifs ?
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
    $lookup: {
      from: "members",
      localField: "memberId",
      foreignField: "_id",
      as: "member"
    }
  },
  {
    $unwind: "$member"
  },

  {
    $match: {
      "member.active": true
    }
  },

  {
    $group: {
      _id: "$member.city",
      eligibleLoansCount: { $sum: 1 },
      revenueCents: { $sum: "$feeCents" }
    }
  },

  {
    $project: {
      _id: 0,
      city: "$_id",
      eligibleLoansCount: 1,
      revenueCents: 1
    }
  },

  {
    $sort: {
      revenueCents: -1,
      city: 1
    }
  }
];