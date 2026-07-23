const EmailService = {
  async sendVerificationEmail(email: string, token: string) {
    console.info(`Send verification email to ${email}: /verify?token=${token}`);
  },

  async sendPasswordResetEmail(email: string, token: string) {
    console.info(`Send reset email to ${email}: /reset-password?token=${token}`);
  },
};

export default EmailService;
