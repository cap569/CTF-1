// This file is used to prevent DB pollution and
// avoid beeing charged $ 20K for a simple CTF.
// Setting up a limit of records and other sensitive/expensive
// resources.

const options = {
  paginationSize: 50, // For admin tables

  maxUsers: 2000,
  maxUsernameLength: 30,
  maxEmailLength: 150,
  maxPasswordLength: 30, // Hashing is expensive...
  maxDescriptionLength: 300,

  maxGames: 50,
  maxGameTitle: 30,
  maxGameDescription: 300,
  maxGamePicture: 300,

  maxPurchases: 5000,

  maxReviews: 5000,
  maxReviewLength: 300,

  // Registers that are not allowed to be changed
  // in the API, for the integrity of the CTF.
  games: [
    "68010848c1b87bae00014279",
    "680108a2c1b87bae0001427c",
    "68011923a8209ee9192941cc",
  ],
};

export default options;
