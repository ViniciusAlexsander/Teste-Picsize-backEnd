const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {
  async insert({
    cpf,
    uf,
    birth,
    requestedAmount,
    deadlinesMonths,
    totalPayable,
    taxPerMonth,
    simulationDay,
  }) {
    try {
      const query = ` INSERT INTO user_loan (
        cpf, uf, birth, requested_amount, deadlines_months, total_payable, tax_per_month,simulation_day
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id`;

      const values = [
        cpf,
        uf,
        (birth = date(birth).iso),
        requestedAmount,
        deadlinesMonths,
        totalPayable,
        taxPerMonth,
        simulationDay,
      ];

      const results = await db.query(query, values);
      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },
};
