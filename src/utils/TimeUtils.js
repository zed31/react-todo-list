/**
 * Compute a cookie expiration date and return it
 * @param {int} expireDaysNbr The number of days befure the cookie expire
 */
export const computeCookieExpireDate = expireDaysNbr => {
    const date = new Date();
    date.setDate(date.getDate() + expireDaysNbr);
    return date;
};
