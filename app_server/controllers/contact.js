/* GET the Contact page */
const contact = (req, res) => {
    res.render('contact', {
        title: "Travlr Getaways",
        // Boolean value passed to view used for conditional formatting
        // in the Header and Footer partials.
        active_nav: {contact: true}
    });
};

module.exports = {
    contact
}