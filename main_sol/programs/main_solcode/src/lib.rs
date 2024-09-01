use anchor_lang::prelude::*;

declare_id!("99m63K9Su2WH46UBekcxP9zUsgn1kg2qj8jyp7URTAW6");

#[program]
pub mod main_solcode {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
