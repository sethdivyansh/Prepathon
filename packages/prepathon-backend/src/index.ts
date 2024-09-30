import { Hono, Context } from "hono"
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js"
import Google from "@auth/core/providers/google"
import { cors } from "hono/cors"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/d1"
import GitHub from "@auth/core/providers/github";
import data, { CompanyData, YearlyData } from "../data";
import * as schema from "./schema"
import { eq } from "drizzle-orm";

interface Bindings {
  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
  AUTH_GITHUB_ID: string;
  AUTH_GITHUB_SECRET: string;
  AUTH_SECRET: string;
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(
  "*",
  cors({
    origin: (origin) => origin,
    allowHeaders: ["Content-Type"],
    allowMethods: ["*"],
    maxAge: 86400,
    credentials: true,
  })
)

app.use("*", initAuthConfig(c => ({
  secret: c.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: c.env.AUTH_GOOGLE_ID,
      clientSecret: c.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: c.env.AUTH_GITHUB_ID,
      clientSecret: c.env.AUTH_GITHUB_SECRET
    })
  ],
  adapter: DrizzleAdapter(drizzle(c.env.DB))
})))

app.get("/", async (c) => {
  return c.redirect("http://localhost:3000")
})

app.use("/api/auth/*", authHandler())

app.use("/api/*", verifyAuth())

app.get("/api/protected", async (c) => {
  const auth = c.get("authUser")
  return c.json(auth)
})

// TODO: Add the companies API routes behind the auth middleware

app.get("/companies/raw-data/:id", async (c) => {
  const id = c.req.param("id");
  const company = data.find((company) => company.sl_no === parseInt(id))
  if (!company) {
    return c.json({ message: "Company not found" }, 404)
  }
  return c.json(company)
});

app.get("/companies", async (c) => {
  return c.json(data.map((company) => ({
    sl_no: company.sl_no,
    company: company.company,
    country: company.country,
    country_code: company.country_code,
    diversity: company.diversity,
    market_cap: company.market_cap.value,
  })))
});

app.get("/api/computations", async (c) => {
  const db = drizzle(c.env.DB);
  const authUser = c.get("authUser").user!;
  const computations = await db.select().from(schema.computations).where(eq(schema.computations.userId, authUser.id)).all();
  return c.json(computations);
});

app.post("/api/companies/analyze/:id", async (c) => {
  const id = c.req.param("id");
  const company = data.find((company) => company.sl_no === parseInt(id))
  if (!company) {
    return c.json({ message: "Company not found" }, 404)
  }

  const db = drizzle(c.env.DB);
  const userId = c.get("authUser").user!.id

  const submittedComputation = await db.insert(schema.computations).values({
    userId,
    companyId: id,
    companyName: company.company,
    status: "running",
    startTime: Date.now(),
  }).returning({ id: schema.computations.id });

  return c.json({ message: "Analysis started", id: submittedComputation[0].id });
});

async function analyzeCompanyBackground(company: CompanyData, allCompanies: CompanyData[], computationId: string, c: Context) {
  const startTime = Date.now();

  try {
    // Perform analysis
    const analysis = await analyzeCompany(company, allCompanies);

    const endTime = Date.now();
    const computationTime = endTime - startTime;

    // Ensure minimum 2 minutes response time
    const remainingTime = Math.max(0, 15000 - computationTime);
    await new Promise(resolve => setTimeout(resolve, remainingTime));

    const db = drizzle(c.env.DB);

    // Update the computation record
    await db.update(schema.computations)
      .set({
        status: "completed",
        endTime: Date.now(),
        result: JSON.stringify({
          analysis,
          computationTime: computationTime / 1000, // in seconds
          totalResponseTime: (Date.now() - startTime) / 1000 // in seconds
        })
      })
      .where(eq(schema.computations.id, computationId));
  } catch (error) {
    console.error('Error in analyzeCompanyBackground:', error);

    const db = drizzle(c.env.DB);

    // Update the computation record with error status
    await db.update(schema.computations)
      .set({
        status: "error",
        endTime: Date.now(),
        result: JSON.stringify({
          error: error.message || 'An unknown error occurred',
          totalResponseTime: (Date.now() - startTime) / 1000 // in seconds
        })
      })
      .where(eq(schema.computations.id, computationId));
  }
}

async function analyzeCompany(company: CompanyData, allCompanies: CompanyData[]) {
  const domesticCompanies = allCompanies.filter(c => c.country_code === company.country_code);

  const analysis = {
    companiesInSameCountry: domesticCompanies.length,
    companiesWithGreaterDiversity: domesticCompanies.filter(c => c.diversity > company.diversity).length,
    yearlyChanges: calculateYearlyChanges(company),
  };

  return analysis;
}

function calculateYearlyChangeInMetric(metric: YearlyData[]) {
  const yearlyChanges = [];
  for (let i = 1; i < metric.length; i++) {
    const current = metric[i].value;
    const previous = metric[i - 1].value;
    const change = ((current - previous) / previous) * 100;
    yearlyChanges.push(change);
  }
  return yearlyChanges;
}

function calculateYearlyChanges(company: CompanyData) {
  return {
    expense: calculateYearlyChangeInMetric(company.expense),
    revenue: calculateYearlyChangeInMetric(company.revenue),
    marketShare: calculateYearlyChangeInMetric(company.market_share),
  };
}

export default app