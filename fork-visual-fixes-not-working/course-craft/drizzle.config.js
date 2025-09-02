/** @type {import ("drizzle-kit").Config}*/

export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://accounts:Jp9iuo8wIAkt@ep-divine-firefly-a52tsz0h.us-east-2.aws.neon.tech/project-ai?sslmode=require",
  },
};
