export const configKeys = {
  app: {
    port: process.env.PORT,
  },
  jwt: {
    access: {
      secret: process.env.ACCESS_SECRET,
      time: process.env.ACCESS_TIME,
    },
    refresh: {
      secret: process.env.REFRESH_SECRET,
      time: process.env.REFRESH_TIME,
    },
  },
  mailer: {
    user: process.env.EMAIL_SERVICE,
    password: process.env.APP_PASSWORD,
    service: process.env.EMAIL_SERVICE,
  },
};
