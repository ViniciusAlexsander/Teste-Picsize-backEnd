const loanModel = require("../models/loanModel");

module.exports = {
  async create(req, res) {
    
    try {
      const {
        cpf,
        uf,
        birth,
        requestedAmount,
        deadlinesMonths,
        taxPerMonth,
        totalPayable,
        plots,
      } = req.body;
  
      const userId = await loanModel.insert({
        cpf,
        uf,
        birth,
        requestedAmount,
        deadlinesMonths,
        totalPayable,
      });
  
      return res.json(userId);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: "Algum erro inesperado aconteceu, tente novamente mais tarde!",
      });
    }
  },
};
