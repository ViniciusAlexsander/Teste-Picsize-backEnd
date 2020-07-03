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

      if (requestedAmount < 50000)
        return res.status(400).json({
          error: "O valor mínimo para empréstimo é de R$50.000,00",
        });

      if (uf !== "MG" && uf !== "SP" && uf !== "RJ" && uf !== "ES")
        return res.status(400).json({
          error: "Não trabalhamos com o estado selecionado",
        });

      let totalPayable;
      let juros; //juros em ingles
      let taxPerMonth;

      //usar switch case
      //validação de UF no default
      if (uf === "MG") {
        taxPerMonth = 1;
      }
      if (uf === "SP") {
        taxPerMonth = 0.8;
      }
      if (uf === "RJ") {
        taxPerMonth = 0.9;
      }
      if (uf === "ES") {
        taxPerMonth = 1.11;
      }

      juros = requestedAmount * (taxPerMonth / 100) * deadlinesMonths;

      totalPayable = Number(requestedAmount) + juros;

      let firstInstallmentDate = Date.now();

      let plots = [];

      //add o momentjs
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
        error: "Algum erro inesperado aconteceu, tente novamente!",
      });
    }
  },
};
