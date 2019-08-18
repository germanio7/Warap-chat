const nothing = [
    {
        role: "unregistered",
        access: false,
        redirect: "home"
    },
    {
        role: "visitor",
        access: false,
        redirect: "home"
    },
    {
        role: "superAdmin",
        access: false,
        redirect: "home"
    },
    {
        role: "administrador",
        access: false,
        redirect: "home"
    }
];

const unregistered = [
    {
        role: "unregistered",
        access: true
    },
    {
        role: "visitor",
        access: false,
        redirect: "home"
    },
    {
        role: "superAdmin",
        access: false,
        redirect: "home"
    },
    {
        role: "administrador",
        access: false,
        redirect: "home"
    }
];

const visitor = [
    {
        role: "unregistered",
        access: false,
        redirect: "login"
    },
    {
        role: "visitor",
        access: true
    },
    {
        role: "superAdmin",
        access: true
    },
    {
        role: "administrador",
        access: true
    }
];

const administrador = [
    {
        role: "unregistered",
        access: false,
        redirect: "login"
    },
    {
        role: "visitor",
        access: false,
        redirect: "home"
    },
    {
        role: "superAdmin",
        access: true
    },
    {
        role: "administrador",
        access: true
    }
];

const superAdmin = [
    {
        role: "unregistered",
        access: false,
        redirect: "login"
    },
    {
        role: "visitor",
        access: false,
        redirect: "home"
    },
    {
        role: "superAdmin",
        access: true
    },
    {
        role: "administrador",
        access: false,
        redirect: "home"
    }
];

export default {
    nothing,
    unregistered,
    visitor,
    administrador,
    superAdmin
};
