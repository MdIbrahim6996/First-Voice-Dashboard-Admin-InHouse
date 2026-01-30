export type LoginFormType = {
    name: string;
};

export type LeadsFormInput = {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    centre: string;
    address: string;
    city: string;
    county: string;
    pincode: string;
    password: string;
    dateOfBirth: string;
    phone: string;
    comment: string;
    poa: boolean;

    process: number;
    plan: string;
    closer: string;
    verifier: string;
    fee: number;
    paymentMethod: string;
    bank: {
        bankName: string;
        accountName: string;
        accountNumber: string;
        sort: string;
    };
    card: {
        name: string;
        bankName: string;
        cardNumber: string;
        expiry: string;
        cvv: string;
    };
    appliances: { name: string; makeOfAppliance: string; age: number }[];
    currency: string;
    shift: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    sort: string;
};
export type UpdateLeadsFormInput = {
    status: number;
    reason: string;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    centre: string;
    address: string;
    city: string;
    county: string;
    pincode: string;
    password: string;
    dateOfBirth: string;
    phone: string;
    poa: string;

    process: number;
    plan: string;
    closer: string;
    verifier: string;
    paymentMethod: string;
    bank: {
        bankName: string;
        accountName: string;
        accountNumber: string;
        sort: string;
    };
    card: {
        name: string;
        bankName: string;
        cardNumber: string;
        expiry: string;
        cvv: string;
    };
    shift: string;
    fee: number;
    currency: string;
    appliances: { name: string; makeOfAppliance: string; age: number }[];
    bankName: string;
    accountName: string;
    accountNumber: string;
    sort: string;
    comment: string;
};
