CREATE TABLE Users(
  Id VARCHAR(36) PRIMARY KEY,
  Name VARCHAR(60) NOT NULL,
  Email VARCHAR(60) UNIQUE NOT NULL,
  Password VARCHAR(60) NOT NULL,
  IsAdmin BOOLEAN DEFAULT FALSE,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)