export interface Task{
    userId: number;
    taskId: number;
    title: string;
    description: string;
    statusId: number;
    status: string | null;
    //Its an date comes in string format due to converting into json
    createdOn: Date;
    completedOn: Date | null;
}


// CREATE TABLE Users (
//     UserId INT IDENTITY(1,1) PRIMARY KEY,
//     Username NVARCHAR(50) NOT NULL,
//     Password NVARCHAR(256) NOT NULL
// );
// CREATE TABLE Statuses (
//     StatusId INT IDENTITY(1,1) PRIMARY KEY,
//     StatusName NVARCHAR(50) NOT NULL
// );
// CREATE TABLE Tasks (
//     TaskId INT IDENTITY(1,1) PRIMARY KEY,
//     UserId INT NOT NULL,
//     Title NVARCHAR(100) NOT NULL,
//     Description NVARCHAR(MAX) NOT NUll,
//     StatusId INT NOT NULL,
//     CreatedOn DATETIME NOT NULL,
//     CompletedOn DATETIME,
//     FOREIGN KEY (UserId) REFERENCES Users(UserId),
//     FOREIGN KEY (StatusId) REFERENCES Statuses(StatusId)
// );
