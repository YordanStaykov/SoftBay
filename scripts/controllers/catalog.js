import { addPartials, getUserData, objectToArray } from "../util.js";
import { del, get, patch, post } from '../data.js'

const url = 'https://softbay-75702-default-rtdb.firebaseio.com/https://my-web-project-f594d.firebaseio.com/';

export async function renderHomePage() {
    this.user = getUserData();
    await addPartials(this);

    let data = await get(url + 'offers.json');

    this.offers = objectToArray(data);

    this.partial('/templates/home.hbs');
};

export async function renderCreateOfferPage() {
    this.user = getUserData();
    await addPartials(this);

    this.partial('/templates/createOffer.hbs');
};

export async function createOfferPost(ctx) {
    ctx.user = getUserData();
    const { description, price, pictureUrl, product } = ctx.params;

    let imgUrlStart = pictureUrl.slice(0, 8);

    if (imgUrlStart !== 'https://') {
        ctx.redirect('/createOffer');
    };

    let obj = {
        description,
        price,
        pictureUrl,
        product,
        creator: ctx.user.email,
    };

    await post(url + 'offers.json', obj);

    ctx.redirect('/dashboard');
};

export async function renderEditOfferPage() {
    this.user = getUserData();
    await addPartials(this);

    const { id } = this.params;

    let data = await get(url + 'offers/' + id + '.json');
    let offer = Object.assign(data, { _id: id });

    this.partial('/templates/editOffer.hbs', offer);
};

export async function editOfferPost(ctx) {
    ctx.user = getUserData();
    await addPartials(ctx);

    const { description,
        price,
        pictureUrl,
        product,
        id } = ctx.params;

    const obj = {
        description,
        price,
        pictureUrl,
        product,
        productsBought: 0,
    };

    await patch(url + 'offers/' + id + '.json', obj);

    ctx.redirect('/dashboard');
};

export async function deleteOffer() {
    const { id } = this.params;

    await del(url + 'offers/' + id + '.json');

    this.redirect('/dashboard');
};

export async function renderDetailsPage() {
    this.user = getUserData();
    await addPartials(this);

    const { id } = this.params;

    let data = await get(url + 'offers/' + id + '.json');

    let offer = Object.assign(data, { _id: id });

    this.partial('/templates/details.hbs', offer);
};

export async function renderDashboardPage() {
    this.user = getUserData();
    await addPartials(this);

    let data = await get(url + 'offers.json');

    let offersArr = objectToArray(data);

    for (let index = 0; index < offersArr.length; index++) {
        offersArr[index].imTheCreator = this.user.email === offersArr[index].creator;
        offersArr[index].count = index;
    };

    this.offers = offersArr;

    this.partial('/templates/dashboard.hbs');
}