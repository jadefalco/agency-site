# Twilio Setup Guide — Missed-Call Recovery Dispatcher

## Prerequisites

Before starting, make sure you have:
- A Twilio account ([sign up](https://www.twilio.com/try-twilio))
- An OpenAI API key ([get one](https://platform.openai.com/api-keys))
- A Vercel account for deployment

---

## 1. Buy a Twilio Phone Number

1. Log in to [Twilio Console](https://www.twilio.com/console)
2. Go to **Phone Numbers → Manage → Buy a number**
3. Apply filters:
   - **Country:** Canada (or United States)
   - **Capabilities:** SMS + MMS
   - **Type:** Local
4. Choose a number in your area (e.g., Kelowna uses 250, 778, or 236 prefixes)
5. Click **Buy** and confirm

> **Note:** Canadian numbers typically cost ~$1.50–$2.50/month. MMS capability is included with most SMS-enabled numbers.

---

## 2. Configure Environment Variables

Add these **exact** variables in your Vercel project settings (Settings → Environment Variables):

| Variable | Example Value | Source |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | Twilio Console → Account Info |
| `TWILIO_AUTH_TOKEN` | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | Twilio Console → Account Info |
| `TWILIO_PHONE_NUMBER` | `+12505551234` | Your purchased number with `+1` prefix |
| `OPENAI_API_KEY` | `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `DATABASE_URL` | `file:./dev.db` | SQLite file path |
| `DASHBOARD_PASSWORD` | `your-secure-password` | Any strong password you choose |

**For local development**, create a `.env.local` file in your project root with the same variables.

> **Security:** Never commit `.env.local` to git. It is already in `.gitignore`.

---

## 3. Configure the SMS Webhook

This is the most critical step. Twilio needs to know where to send incoming texts.

### Production Webhook URL

```
https://your-domain.com/api/twilio/incoming
```

Replace `your-domain.com` with your actual domain (e.g., `truenorthwebsites.com`).

### Exact Twilio Console Steps

1. Go to **Phone Numbers → Manage → Active numbers**
2. Click your purchased phone number
3. Scroll to the **Messaging Configuration** section
4. Find **A message comes in**
5. Set:
   - **Accept incoming SMS messages as:** `Webhook`
   - **Webhook URL:** `https://truenorthwebsites.com/api/twilio/incoming`
   - **HTTP Method:** `POST`
6. Click **Save Configuration**

### Webhook URL Format Reference

| Environment | URL |
|---|---|
| Production | `https://truenorthwebsites.com/api/twilio/incoming` |
| Local (with ngrok) | `https://abc1-23-456-789.ngrok.io/api/twilio/incoming` |

---

## 4. Enable and Verify MMS (Photo Uploads)

Most Twilio numbers support MMS out of the box. To verify:

1. In Twilio Console, go to **Phone Numbers → Manage → Active numbers**
2. Click your number
3. Look at the **Capabilities** section
4. Confirm both **SMS** and **MMS** are listed

If MMS is not available:
- Try a different number type (Local vs. Mobile)
- Contact Twilio support to enable MMS on your account

**How photo uploads work:**
- Customer texts a photo to your Twilio number
- Twilio stores the image and sends your webhook a `MediaUrl0` parameter
- The dispatcher saves the URL and continues the conversation
- You view the photo thumbnail in the dashboard

---

## 5. Deploy to Vercel

```bash
# Build locally to verify
npm run build

# Deploy to production
vercel --prod
```

### Post-Deployment Checklist

- [ ] All 6 environment variables are set in Vercel
- [ ] Twilio webhook URL points to your production domain
- [ ] `/dashboard` loads and password login works
- [ ] `/missed-call-recovery` landing page still works

---

## 6. Test from Your Phone

1. Text your Twilio number: **"I have a leak under my kitchen sink"**
2. You should receive a reply within 1–3 seconds
3. Continue answering the dispatcher's questions
4. Try sending a photo when asked
5. Go to `https://your-domain.com/dashboard`
6. Log in with your `DASHBOARD_PASSWORD`
7. Verify the lead appears with conversation history, urgency score, and photo

### Expected Conversation Flow

```
You: I have a leak under my kitchen sink
Bot: Where's the leak coming from?
      1. Under Sink
      2. Ceiling
      3. Toilet
      4. Basement
      5. Pipe / Wall
      6. Outside

You: under sink
Bot: How bad is the leak right now?
      1. Dripping
      2. Steady Leak
      3. Actively Flooding

[Continue through all questions...]

Bot: Thanks — we've received your request. A plumber will contact you shortly.
```

---

## 7. Test Locally (No Twilio Needed)

Start the dev server:

```bash
npm run dev
```

Send a simulated inbound message:

```bash
curl -X POST http://localhost:3000/api/test-sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+12505550199",
    "body": "My basement is flooding from a burst pipe"
  }'
```

**Note:** The test endpoint is automatically disabled in production (returns 403).

---

## 8. Dashboard Access

- **URL:** `https://truenorthwebsites.com/dashboard`
- **Password:** Your `DASHBOARD_PASSWORD` environment variable
- **Session:** Remembers you for 7 days via HTTP-only cookie
- **Logout:** Click the Logout button in the top-right of the dashboard

---

## Troubleshooting

| Issue | Likely Cause | Fix |
|---|---|---|
| Twilio returns 404 | Webhook URL incorrect | Verify the URL includes `https://` and `/api/twilio/incoming` |
| No reply from bot | Missing `OPENAI_API_KEY` | Check env vars in Vercel; verify API key has credits |
| No reply from bot | Missing `DATABASE_URL` | Ensure `DATABASE_URL="file:./dev.db"` is set |
| Messages not saving | Prisma not migrated | Run `npx prisma migrate dev` locally; Vercel uses the same DB file |
| Dashboard shows config error | `DASHBOARD_PASSWORD` missing | Add it to Vercel environment variables |
| Dashboard redirects to login | Cookie expired or wrong password | Re-enter password; cookie lasts 7 days |
| Photo not showing | Twilio number lacks MMS | Buy a different number with MMS capability |
| Photo not showing | Image URL expired | Twilio media URLs expire after 24 hours by default |
| Urgency score not updating | Flow response not matching | Customer may have typed an unexpected response; dispatcher will re-ask |
| "I didn't catch that" repeated | Option mismatch | Ask customer to reply with the number (1, 2, 3) or exact option text |

### Checking Twilio Logs

1. Go to **Monitor → Logs → Messaging** in Twilio Console
2. Look for failed requests to your webhook URL
3. Check the HTTP response code and body

### Checking Vercel Logs

1. Go to your project in Vercel
2. Click **Logs**
3. Filter by function: `api/twilio/incoming`
4. Look for `[Twilio Webhook]` prefixed log lines

---

## Architecture Summary

```
Customer SMS → Twilio → POST /api/twilio/incoming
                              ↓
                    Parse From, Body, MediaUrl
                              ↓
                    lib/dispatcher.ts
                              ↓
                    Deterministic flow engine
                              ↓
                    Prisma + SQLite (Lead, Message)
                              ↓
                    TwiML XML reply → Twilio → Customer
                              ↓
                    /dashboard (password protected)
```
