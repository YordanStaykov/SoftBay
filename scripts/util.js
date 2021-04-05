export function objectToArray(data) {
    if (data === null) {
        return [];
    } else {
        return Object.entries(data).map(([key, value]) => Object.assign({ _id: key }, value));
    };
};

export async function addPartials(ctx) {
    const partials = await Promise.all([
        ctx.load('/templates/partials/header.hbs'),
        ctx.load('/templates/partials/footer.hbs'),
    ]);

    ctx.partials = {
        header: partials[0],
        footer: partials[1],
    };
};

export function saveUserData(data) {
    const { user: { email, uid } } = data;
    sessionStorage.setItem('user', JSON.stringify({ email, uid, productsBought: 0 }));
};

export function getUserData() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export function clearUserData() {
    sessionStorage.removeItem('user');
};