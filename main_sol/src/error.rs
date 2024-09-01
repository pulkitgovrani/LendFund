use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The loan has already been repaid.")]
    LoanAlreadyRepaid,
    #[msg("The loan has not been approved.")]
    LoanNotApproved,
    #[msg("Insufficient funds.")]
    InsufficientFunds,
}
