// This file is used to prevent DB pollution and
// avoid beeing charged $ 20K for a simple CTF.
// Setting up a limit of records and other sensitive/expensive
// resources. Thank me later.

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
};

export default options;
