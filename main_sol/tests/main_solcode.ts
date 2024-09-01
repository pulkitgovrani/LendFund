import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MainSolcode } from "../target/types/main_solcode";

describe("main_solcode", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.MainSolcode as Program<MainSolcode>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
