const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const anchor = require('@project-serum/anchor');
require('dotenv').config();

const app = express();
app.use(express.json());

const connection = new Connection(process.env.SOLANA_CLUSTER_URL);
const wallet = anchor.Wallet.local();
const provider = new anchor.Provider(connection, wallet, anchor.Provider.defaultOptions());
anchor.setProvider(provider);

const programId = new PublicKey(process.env.PROGRAM_ID);
const idl = require('./path/to/idl/micro_lending.json');
const program = new anchor.Program(idl, programId);

app.post('/api/loans/create', async (req, res) => {
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

app.post('/api/loans/approve', async (req, res) => {
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

app.post('/api/loans/repay', async (req, res) => {
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

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});
