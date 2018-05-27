module.exports = (req,res) => {
    // display the exports button
    const user = req.context.currentUser;
    console.log(user);
    return `
    <form>
        <input >
        <input >
    </form>
    `;
}