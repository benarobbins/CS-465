/* GET About page */
const about = (req, res) => {
    res.render('about', {
        title: "Travlr Getaways",
        active_nav: {about: true}
    });
};

module.exports = {
    about
}