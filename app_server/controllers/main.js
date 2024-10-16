/* GET the Homepage */
const index = (req, res) => {
    res.render('index', {
        title: "Travlr Getaways",
        // Boolean value passed to view used for conditional formatting
        // in the Header and Footer partials
        active_nav: {index: true}
    });
};

module.exports = {
    index
}