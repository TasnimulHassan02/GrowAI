export const createUser = async (req, res) => {
    // Logic to create a new user
    res.status(201).send('User created');
};

export const getUsers = async (req, res) => {
    // Logic to get all users
    res.status(200).send('List of users');
};