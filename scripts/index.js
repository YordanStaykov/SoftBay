import { renderHomePage, renderCreateOfferPage, createOfferPost, renderDashboardPage, renderEditOfferPage, editOfferPost, deleteOffer, renderDetailsPage } from './controllers/catalog.js'
import { renderRegisterPage, renderLoginPage, registerPagePost, loginPagePost, logOut } from './controllers/user.js';

const router = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('/', renderHomePage);
    this.get('/home', renderHomePage);

    // User
    this.get('/login', renderLoginPage);
    this.post('/login', (ctx) => { loginPagePost(ctx) });

    this.get('/register', renderRegisterPage)
    this.post('/register', (ctx) => { registerPagePost(ctx) });

    this.get('/logout', logOut);

    // Offers
    this.get('/createOffer', renderCreateOfferPage);
    this.post('/createOffer', (ctx) => { createOfferPost(ctx) });

    this.get('/editOffer/:id', renderEditOfferPage);
    this.post('/editOffer/:id', (ctx) => { editOfferPost(ctx) });

    this.get('/delete/:id', deleteOffer);

    this.get('/details/:id', renderDetailsPage);

    // Dashboard
    this.get('/dashboard', renderDashboardPage);
});

router.run();