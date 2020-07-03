const { date, formatPrice } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const { cpf, uf, birth, requestedAmount, deadlinesMonths } = req.body;

      if (deadlinesMonths > 360)
        return res.status(400).json({
          error:
            "O prazo máximo de pagamento deve ser menor que 30 anos ou 360 meses",
        });

      if (requestedAmount < 5000000)
        return res.status(400).json({
          error: "O valor mínimo para empréstimo é de R$50.000,00",
        });

      let totalPayable;
      let juros;
      let taxPerMonth;

      if (uf === "MG") {
        taxPerMonth = 1;
        juros = requestedAmount * (taxPerMonth / 100) * deadlinesMonths;
      }
      if (uf === "SP") {
        taxPerMonth = 0.8;
        juros = requestedAmount * (taxPerMonth / 100) * deadlinesMonths;
      }
      if (uf === "RJ") {
        taxPerMonth = 0.9;
        juros = requestedAmount * (taxPerMonth / 100) * deadlinesMonths;
      }
      if (uf === "ES") {
        taxPerMonth = 1.11;
        juros = requestedAmount * (taxPerMonth / 100) * deadlinesMonths;
      }

      totalPayable = Number(requestedAmount) + juros;

      let firstInstallmentDate = Date.now();

      let plots = [];

      for (let i = 1; i <= Number(deadlinesMonths); i++) {
        plots.push(
          `${date(firstInstallmentDate).day}/${
            Number(date(firstInstallmentDate).month) + i
          }/${date(firstInstallmentDate).year}`
        );
      }

      userLoan = {
        cpf,
        uf,
        birth: date(birth).iso,
        requestedAmount,
        deadlinesMonths,
        taxPerMonth,
        totalPayable,
        plots,
      };

      return res.json(userLoan);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: "Algum erro inesperado aconteceu, tente novamente mais tarde!",
      });
    }
  },
};
