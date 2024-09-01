const express = require('express');
const router = express.Router();

// Define route handlers here
router.post('/create', async (req, res) => {
  try {
    const { amount } = req.body;
    const tx = await program.rpc.createLoan(new anchor.BN(amount), {
      accounts: {
        loanAccount: new PublicKey('LoanAccountPubkey'),
        user: wallet.publicKey,
      },
    });
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/approve', async (req, res) => {
  try {
    const { loanId } = req.body;
    const tx = await program.rpc.approveLoan(new anchor.BN(loanId), {
      accounts: {
        loanAccount: new PublicKey('LoanAccountPubkey'),
      },
    });
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/repay', async (req, res) => {
  try {
    const { loanId } = req.body;
    const tx = await program.rpc.repayLoan(new anchor.BN(loanId), {
      accounts: {
        loanAccount: new PublicKey('LoanAccountPubkey'),
      },
    });
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
