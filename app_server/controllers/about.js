/* GET the About page */
const about = (req, res) => {
    res.render('about', {
        title: "Travlr Getaways",
        // Boolean value passed to view used for conditional formatting
        // in the Header and Footer partials.
        active_nav: {about: true}
    });
};

module.exports = {
    about
}