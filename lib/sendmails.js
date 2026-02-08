export const sendEmail = async ({ email, subject, otp }) => {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": process.env.BREVO_API_KEY, // xkeysib-...
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Servifyr Team",
        email: "no-reply@servifyr.com", // verified
      },
      to: [{ email }],
      subject,
      htmlContent: `
        <h2>Password Reset</h2>
        <p>Your OTP:</p>
        <h1>${otp}</h1>
        <p>Valid for 5 minutes</p>
      `,
    }),
  });

  if (!res.ok) {
    throw new Error("Brevo email failed");
  }
};
