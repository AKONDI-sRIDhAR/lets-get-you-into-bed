Let's Get You Into Bed 🌙
A cozy bedtime stories site with daily AI-generated tales for kids (4-10). Features witty Akbar-Birbal or Tenali Ramakrishna stories, automated via n8n and updated daily.
Live: https://lets-get-you-into-bed.vercel.app/
Tech

Next.js + Tailwind
Supabase Postgres + Prisma
Google Gemini AI
n8n automation

Setup

Clone: git clone https://github.com/AKONDI-sRIDhAR/lets-get-you-into-bed.git
Install: npm i
Env: Add DATABASE_URL to .env.local (from Supabase).
DB: npx prisma db push && npx prisma generate
Run: npm run dev
Deploy: vercel --prod (add env in Vercel dashboard).


n8n Automation
Self-host: docker run -p 5678:5678 n8nio/n8n.
Workflow (Import JSON from repo/docs):

Trigger: Cron 0 20 * * * (8 PM UTC; TZ=Asia/Kolkata).
Gemini: Prompt for JSON {title, excerpt, content} (Akbar/Birbal tales, 500-800 words, \n\n paras).
Set: Extract generatedText = $json.content.parts[0].text.
JS2: Parse JSON, add date, build body.
HTTP: POST to Supabase function.

Test: Execute workflow → Check Supabase table → Site refresh.
