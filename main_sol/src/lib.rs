use anchor_lang::prelude::*;

declare_id!("YourProgramIDHere");

#[program]
pub mod micro_lending {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let loan_account = &mut ctx.accounts.loan_account;
        loan_account.amount = 0;
        loan_account.approved = false;
        loan_account.repaid = false;
        Ok(())
    }

    pub fn create_loan(ctx: Context<CreateLoan>, amount: u64) -> ProgramResult {
        let loan_account = &mut ctx.accounts.loan_account;
        if amount <= 0 {
            return Err(ErrorCode::InvalidAmount.into());
        }
        loan_account.amount = amount;
        loan_account.approved = false;
        loan_account.repaid = false;
        Ok(())
    }

    pub fn approve_loan(ctx: Context<ApproveLoan>, loan_id: u64) -> ProgramResult {
        let loan_account = &mut ctx.accounts.loan_account;
        if loan_account.approved {
            return Err(ErrorCode::LoanAlreadyApproved.into());
        }
        loan_account.approved = true;
        Ok(())
    }

    pub fn repay_loan(ctx: Context<RepayLoan>, loan_id: u64) -> ProgramResult {
        let loan_account = &mut ctx.accounts.loan_account;
        if !loan_account.approved {
            return Err(ErrorCode::LoanNotApproved.into());
        }
        if loan_account.repaid {
            return Err(ErrorCode::LoanAlreadyRepaid.into());
        }
        loan_account.repaid = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 64)]
    pub loan_account: Account<'info, LoanAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateLoan<'info> {
    #[account(mut)]
    pub loan_account: Account<'info, LoanAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct ApproveLoan<'info> {
    #[account(mut)]
    pub loan_account: Account<'info, LoanAccount>,
}

#[derive(Accounts)]
pub struct RepayLoan<'info> {
    #[account(mut)]
    pub loan_account: Account<'info, LoanAccount>,
}

#[account]
pub struct LoanAccount {
    pub amount: u64,
    pub approved: bool,
    pub repaid: bool,
}
