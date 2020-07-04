CREATE DATABASE testePicsize;

CREATE TABLE "user_loan" (
  "id" SERIAL PRIMARY KEY,
  "cpf" text UNIQUE NOT NULL,
  "uf" text,
  "birth" timestamp,
  "requested_amount" double precision,
  "deadlines_months" int,
  "total_payable" double precision,
  "tax_per_month" double precision,
  "simulation_day" timestamp
);