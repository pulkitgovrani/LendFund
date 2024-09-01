import { Connection, PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';

const connection = new Connection(process.env.REACT_APP_SOLANA_CLUSTER_URL);

const programId = new PublicKey(process.env.REACT_APP_PROGRAM_ID);
const idl = require('../path/to/idl/micro_lending.json');
const provider = new anchor.Provider(connection, wallet, anchor.Provider.defaultOptions());
const program = new Program(idl, programId, provider);

