const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('').toUpperCase();
    return initials;
};
export {
    getInitials,
};