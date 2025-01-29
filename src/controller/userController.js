function addUser(req, res) {
    setTimeout(() => {
        res.send({ statusCode: 200, message: 'user added' });
    }, 3000);
}

export { addUser };