/* GET Contact page */
const contact = (req, res) => {
    res.render('contact', {
        title: "Travlr Getaways",
        active_nav: {contact: true}
    });
};

module.exports = {
    contact
}