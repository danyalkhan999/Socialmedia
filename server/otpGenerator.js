import otpGenerator from 'otp-generator'



export const OtpGenerator = () => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    return otp;
}

