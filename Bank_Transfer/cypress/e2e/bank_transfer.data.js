export const ibans = {
    valid: "FR7630006000011234567890189",
    lowboundary: "FR762200220022",
    invalid: "FR76223300123",
    highboundary: "FR76300060000112345678901890000202",
};

export const amounts = {
    valid: "100",
    lowboundary: "0.01",
    highboundary: "100000",
    invalid: "100000.01",
};

export const validData = {
    BeneficiaryName: "Julie Santo",
    IBAN: ibans.valid,
    Label: "Test payment Julie",
    Amount: amounts.valid,
};

export const emptyData = {
    BeneficiaryName: "",
    IBAN: "",
    Label: "",
    Amount: "",
};

export const invalidData = {
    BeneficiaryName: "Julie Santo 123",
    IBAN: ibans.invalid,
    Label: "A".repeat(256),
    Amount: amounts.invalid,
};

export const invalidFormatData = {
    Label: "Test payment !!!",
};
