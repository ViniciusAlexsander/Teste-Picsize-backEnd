module.exports = {
  async index(req, res) {
    const { cpf, uf, birth, requested_amount, deadlines_months } = req.body;

    if (deadlines_months > 360)
      return res.json({
        error:
          "O prazo máximo de pagamento deve ser menor que 30 anos ou 360 meses",
      });

    if (requested_amount < 5000000)
      return res.json({
        error: "O valor mínimo para empréstimo é de R$50.000,00",
      });

    let totalPayable;
    let juros;
    let taxPerMonth;

    if (uf === "MG") {
      taxPerMonth = 1;
      juros = requested_amount * (taxPerMonth / 100) * deadlines_months;
    }
    if (uf === "SP") {
      taxPerMonth = 0.80;
      juros = requested_amount * (taxPerMonth / 100) * deadlines_months;
    }
    if (uf === "RJ") {
      taxPerMonth = 0.90;
      juros = requested_amount * (taxPerMonth / 100) * deadlines_months;
    }
    if (uf === "ES") {
      taxPerMonth = 1.11;
      juros = requested_amount * (taxPerMonth / 100) * deadlines_months;
    }

    totalPayable = requested_amount + juros;

    userLoan = {
      cpf,
      uf,
      birth,
      requested_amount,
      deadlines_months,
      totalPayable,
      taxPerMonth,
    };
  },
};
