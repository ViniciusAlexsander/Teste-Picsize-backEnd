const { date, formatPrice } = require("../../lib/utils");
const { defaults } = require("pg");
const moment = require("moment");
const { months } = require("moment");

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

      let totalPayable;
      let interestAmount;
      let taxPerMonth;

      switch (uf) {
        case "MG":
          taxPerMonth = 1;
          break;
        case "SP":
          taxPerMonth = 0.8;
          break;
        case "RJ":
          taxPerMonth = 0.9;
          break;
        case "ES":
          taxPerMonth = 1.11;
          break;
        default:
          return res.status(400).json({
            error: "Não trabalhamos com o estado selecionado",
          });
      }

      interestAmount = requestedAmount * (taxPerMonth / 100) * deadlinesMonths;

      totalPayable = Number(requestedAmount) + interestAmount;

      let firstInstallmentDate = Date.now();

      let plots = [];
      let installmentValue = totalPayable /  deadlinesMonths

      //utilizando o momentjs para calcular o dia de vencimento das parcelas
      //Baseado no dia em que foi solicitada a simulação do emprestimo
      for (let i = 1; i <= Number(deadlinesMonths); i++) {
        plots.push(plot = {
          installmentValue: formatPrice(installmentValue),
          installmentMaturity: date(moment().add(i,'months')).format
        });
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
