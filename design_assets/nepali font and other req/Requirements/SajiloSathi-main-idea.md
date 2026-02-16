**SajiloSathi -- Phase 1 Requirements & Documentation**

**Project Overview**

**App Name:** SajiloSathi

**Type:** Utility-first daily web app

**Purpose:** Provide essential Nepali daily tools and local information
for users, including calendar, weather, gold/NEPSE rates, reminders,
festivals, and government documents making guide .

**Target Users:** Nepali students, professionals, and general users who
want **daily utility information in one place**.

**Platform:** Web (server-rendered, PHP / Laravel preferred)

**Revenue Model:** Ads, sponsored listings, optional premium ad-free
version

**Fonts for nepali**

**Inter** is a modern, highly legible font that works exceptionally well
on digital screens. For the Nepali (Devanagari) script specifically, it
relies on high-quality Unicode rendering (often falling back to
system-standard fonts like **Noto Sans Devanagari**) to ensure that the
characters remain crisp and professional across both public and
administrative pages.

**Typography**

-   **Primary Font:** **Inter**

    -   Used for all headings, navigation, and body text. It was chosen
        for its exceptional readability on screens and its modern,
        neutral aesthetic.

**Color Palette**

-   **Primary Deep Blue:** #1a355b

    -   Used for the logo, main navigation headers, primary buttons, and
        authoritative headings to establish trust.

-   **Background (Pure White):** #ffffff

    -   Used as the base for all pages to maintain a clean,
        high-contrast, and \"utility-first\" feel.

-   **Secondary / Accent Gold:** #cc9900 (approximate, used in
    bullion/gold markers)

    -   Used sparingly to highlight financial data related to Gold and
        Silver.

-   **Surface / Subtle Gray:** #f8fafc

    -   Used for card backgrounds and subtle section dividers to give
        the UI depth without clutter.

-   **Success / Trend Up:** #10b981 (Green)

    -   Used for positive market trends (Gold/NEPSE gains).

-   **Danger / Trend Down:** #ef4444 (Red)

    -   Used for negative market trends or critical alerts.

**Objectives**

-   Offer daily utilities in **Nepali language**.

-   Provide accurate, **location-based** information (weather,
    festivals).

-   Show **Nepali calendar** and daily reminders.

-   Keep interface **lightweight, fast, and secure**.

-   Protect **backend logic & API keys** from being visible on the
    frontend.

**Target Features (Phase 1)**

1.  **Core User Features**

**Feature Description Priority**

Nepali Calendar Show today's Nepali date (Tithi), festivals, public
holidays High

Weather Display local weather based on user location High

Gold & Silver Daily gold & silver rates in Nepal High

NEPSE Show stock market index & top gainers/losers High

Daily Reminders Allow users to set reminders for personal tasks Medium

Notifications Optional push notifications for festivals, gold/NEPSE
alerts Medium

2.  **Admin Panel Features**

  --------------------------------------------------------------------------------
  **Feature**       **Description**                                 **Priority**
  ----------------- ----------------------------------------------- --------------
  Secure Login      Admin authentication                            High

  --------------------------------------------------------------------------------

Content Management Add/Edit/Delete: Guide, festivals, gold/silver rates,
NEPSE data High

Bulk Upload Upload CSV/JSON files for multiple updates Medium

Analytics (Optional) View daily active users and traffic Low

**Pages / Structure (Phase 1)**

**Page Purpose Content / Components**

**Home / Landing** Overview of app Header (logo), links to tools, top
Guide snippets

+------------------------------+---------------------------------------+
| **Calendar** Show Nepali     |                                       |
| date & festivals Today's     |                                       |
| Tithi, upcoming festivals,   |                                       |
| user reminders               |                                       |
+==============================+=======================================+
| **Weather** Local weather    | > Current weather, temp, condition,   |
| info                         | > forecast                            |
+------------------------------+---------------------------------------+
| **Gold & Silver** Daily      | > Gold price, silver price, rise/fall |
| rates                        | > compared to yesterday               |
+------------------------------+---------------------------------------+
| **NEPSE** Stock market info  | > NEPSE index, top gainers/losers     |
+------------------------------+---------------------------------------+
| **Snippets** Display guides  | > Guides for governments              |
+------------------------------+---------------------------------------+
| **Admin Panel** Manage       | > Login, add/edit/delete guides,      |
| content                      | > festivals, gold/NEPSE rates         |
|                              |                                       |
| **Total Pages:** 7           |                                       |
+------------------------------+---------------------------------------+

**Technical Requirements**

**Suggested Tech Stack for SajiloSathi Phase 1**

**Layer Tech Choice Notes**

**Pages server-rendered → users cannot see**

**Frontend Next.js (React SSR)**

> **logic; fast SEO**

**Secure server-side API, handles calendar,**

**Backend Laravel (PHP)**

**weather, NEPSE, gold/silver, reminders**

**Database MySQL / PostgreSQL Store users, reminders, content**

**Layer Tech Choice Notes**

**Hosting Railway Free tier works for Phase 1**

**HTTPS, CSP headers, CORS, backend-only Protects against XSS, CSRF, SQL
Injection, data**

**Security**

**API keys, server-side validation leaks**

**How This Stack Keeps Your App Safe**

1.  **Frontend (Next.js SSR):**

    -   **HTML/CSS delivered to browser** o **Minimal JS for UI** o
        **All logic hidden on server**

2.  **Backend (Laravel):**

    -   **All calculations (Nepali date, gold, NEPSE, weather API calls)
        happen here** o **API keys never go to client** o **Admin panel
        fully protected** o **Database access only through backend**

3.  **Database & Hosting:**

    -   **User data encrypted** o **Railway free tier provides HTTPS**

    -   **Only server communicates with DB**

-   **Security:**

    -   HTTPS enforced

    -   Backend handles all API keys o CORS restricted to your domain

    -   Admin panel protected via login

-   **SEO:** Pages fully server-rendered for Google indexing

-   **Performance:** Load pages under 3 seconds on 4G

**Data Flow & Architecture**

User Browser

↓ (request page)

Server (Laravel / PHP)

↓ fetch APIs & database

Backend returns rendered HTML

↓

User sees page (no JS logic or API keys visible)

**Backend Responsibilities:**

-   Fetch and calculate all data (Nepali date, weather, gold/silver,
    NEPSE, government documents guide).

-   Store & manage reminders.

-   Handle admin login and content management.

**Frontend Responsibilities:**

-   Render HTML & CSS output

-   Minimal JS only for UI interactions (like dropdowns or tabs)

**Security Measures**

1.  **No sensitive API keys in frontend**

2.  **All calculations and data fetching on server**

3.  **HTTPS enabled**

4.  **Admin panel behind login**

5.  **Database access only via backend**

6.  Optional: **Rate limiting & IP restrictions** for APIs

**Project Phases**

**Phase Features**

**Phase 1**

> Calendar, Weather, Gold/Silver, NEPSE, Admin panel

**(MVP)**

^**Phase\ 2+**^ , Push notifications, Additional tools (BMI, Loan
calculator), **Phase Features**

> Premium ad-free option, PWA install

**Success Metrics**

-   **DAU (Daily Active Users):** 1000+ in first 3 months

-   **User retention:** 50% after 1 week

-   **Revenue:** Ad clicks & sponsored listings

-   **User Feedback:** Positive reviews on utility & ease of use

**1** **Notes / Considerations**

-   Focus on **Nepali language** for better engagement and trust.

-   Use **free APIs first**, upgrade to paid APIs only if user base
    grows.

-   **Server-rendered architecture** ensures logic, API keys, and
    calculations are **never exposed** in frontend.

-   SEO is easier because all pages are **pre-rendered HTML**.

**Use Server-Rendered Pages (SSR)**

-   Framework like **Laravel (PHP)** or **Next.js SSR** → all pages are
    pre-rendered HTML.

-   Google can crawl the content easily; no heavy JS needed.

-   Each page (calendar, weather, NEPSE, gold) should have its **own
    URL**:

-   sajilosathi.com.np/calendar

-   sajilosathi.com.np/weather

-   sajilosathi.com.np/nepse

-   sajilosathi.com.np/gold

-   Avoid React SPA without SSR for SEO, because Google might not index
    dynamic JS content fully.

**On-Page SEO**

For each page, do the following:

**a) Title Tag:**

-   Example: \<title\>Nepali Calendar & Festivals Today \|
    > SajiloSathi\</title\> **b) Meta Description:**

-   Example: \<meta name=\"description\" content=\"Check today's Nepali
    > date, festivals, weather, gold/silver rates, and NEPSE updates on
    > SajiloSathi.\"\>

c)  **Header Tags (H1, H2, H3):**

    -   H1 = main page topic

    -   H2 = sub-sections

    -   Helps Google understand page content

d)  **URL Structure:**

    -   Clean and readable URLs, no query strings: /calendar,
        /weather/kathmandu

e)  **Structured Data (Schema.org):**

    -   Use JSON-LD to mark content: headlines, events, stock prices,
        weather.

    -   Example: mark festivals as Event, gold as Product with price.

**Content Optimization**

-   Use **Nepali keywords** for searches like:

    -   "आजको मिती" → today's date o "काठिाड ौं ि सि" → Kathmandu weather

    -   "सुन चााँदी िूल्य" → gold silver price

    -   "NEPSE आज" → NEPSE today

-   Add **unique descriptions** for each page, don't just copy from
    other sites.

**Internal Linking**

-   Link pages to each other with relevant anchor text:

    -   Example: "Check today's Nepali festivals in our Calendar page" •
        Helps Google crawl the site fully and understand relationships.

**Sitemap & Robots**

-   Create sitemap.xml → submit to **Google Search Console**

-   Allow Google to crawl main pages, block admin panel:

-   User-agent: \*

-   Disallow: /admin

-   Allow: /

**Performance & Mobile**

-   Google ranks fast, mobile-friendly sites higher.

-   Use **lazy loading images**, minified CSS/JS.

-   Make sure pages **load under 3 seconds**.

**Optional for Extra Boost**

-   Open Graph / Twitter Card meta → helps sharing on social media

-   Multilingual content → Nepali + English version for search reach

**Summary**

1.  Use **server-rendered pages** → Laravel or Next.js SSR

2.  Optimize **titles, meta, headers, URLs** with Nepali keywords

3.  Add **structured data** for, events, gold/NEPSE

4.  Create **sitemap.xml** and submit to Google Search Console

5.  Ensure **fast, mobile-friendly pages**

6.  Get **trusted backlinks** from local Nepali sites

Tip: Start Phase 1 small, index your main pages, then expand keywords as
you add features.

**2️⃣ Admin Panel Settings / Controls**

Admin panel is **the brain of your app**. You want it **secure, simple,
and comprehensive**.

**a) Admin Authentication**

-   Secure login (email + password)

-   Two-factor authentication (optional but recommended)

-   Logout / session timeout

**b) Calendar / Festivals Management**

-   Add/Edit/Delete festivals and public holidays

-   Set reminders for each festival (optional for push notifications
    later)

-   Manage Nepali calendar data (Tithi, month, year)

-   Upload bulk calendar data (CSV/JSON)

**c) Weather API / Settings**

-   Enter weather API key (hidden from frontend)

-   Enable/disable automatic updates

-   Configure default location (for users who don't allow location
    access)

**d) Gold & Silver Rates**

-   Add daily gold/silver prices manually or via API

-   Compare yesterday's rate automatically

-   Option to show price trend (up/down arrow)

**e) NEPSE Management**

-   Add/update NEPSE index & top gainers/losers manually or via API

-   Set auto-update schedule if API used

-   Option to hide/show NEPSE page temporarily

**g) User / App Settings (Optional for Phase 1)**

-   Toggle features ON/OFF (weather, NEPSE, gold/silver, calendar)

-   Set app-wide announcements (display on landing page)

-   Manage push notifications (later phases)

**h) Security & Backup**

-   Backup database manually or schedule automatic backup

-   View recent admin logins & activities

-   Change admin password

💡 **Extra Notes:**

-   Keep **API keys and sensitive configs hidden from frontend**

-   Admin panel should **never expose backend logic**

-   Make all updates **reflect instantly on frontend**

**1️⃣ Nepali Date & Calendar (MOST IMPORTANT)**

**✅ Best FREE sources (Phase 1)**

**Option A: Government / Official Data (Best for trust)**

-   **Nepal Panchanga Nirnayak Samiti**

    -   This is the **official authority** for:

        -   Nepali date (Bikram Sambat)

        -   Tithi

        -   Festivals

        -   Public holidays

-   Problem:

    -   ❌ No public API

    -   ✔ But calendars are published yearly (PDF / print)

**What you do**

-   Manually enter **yearly calendar data once**

-   Store in your database

-   Update **once per year**

-   This is how many apps start

✔ Legal\
✔ Accurate\
✔ Trustworthy

**Option B: Open-source Nepali Date Libraries**

Good for **date conversion (AD ↔ BS)**

Popular ones:

-   nepali-date-converter (JS / Python versions)

-   nepali_datetime (Python)

What they give:

-   BS date

-   Month

-   Day

-   Weekday

What they **do NOT give**:

-   Festivals

-   Events

-   Holidays

👉 Use these **only for date math**, not events.

**Recommended Combo**

-   Date conversion → **Library**

-   Festivals & holidays → **Manual DB (official source)**

This is **industry practice**.

**2️⃣ Festivals & Events (Nepali)**

**Phase 1 approach (REALISTIC)**

Create a table like:

Festival {

name

nepali_date

english_date

type (festival / holiday)

description

is_public_holiday (yes/no)

}

**Sources:**

-   Official Nepali calendar

-   Government holiday notices

-   Well-known public festivals (Dashain, Tihar, Chhath, etc.)

⚠️ Do **NOT scrape HamroPatro**

-   Illegal

-   Risky

-   They will block you

**3️⃣ Weather Data**

**Phase 1 (Free)**

-   OpenWeatherMap (free tier)

-   WeatherAPI (free tier)

Use:

-   Backend fetch

-   Cache results

-   Never expose API key in frontend

**4️⃣ Gold & Silver Rates**

**Phase 1 (Manual is OK)**

Sources:

-   Nepal Gold and Silver Dealers Association (daily rates)

How:

-   Admin updates daily

-   Takes 30 seconds/day

-   Builds accuracy + trust

Later:

-   Paid API (Phase 2 or 3)

**5️⃣ NEPSE Data**

**Phase 1 (Reality check)**

-   ❌ No fully free, reliable API

-   ✔ Manual daily update OR delayed data

Do:

-   Show:

    -   NEPSE index

    -   Top gainers/losers

-   Updated once daily by admin

This is normal for early-stage apps.

**7️⃣ Why This Works (Important Truth)**

You are competing with **HamroPatro**, not beating them on Day 1.

Your advantage:

-   Simpler

-   Cleaner

-   Faster

-   Trust-first

-   No bloat

Most users:

-   Just want **today's date + events**

-   Don't care about 100 features

**Phase 1 Data Summary (Simple Table)**

  --------------------------------------------------------------------------
  **Feature**          **Source**                                 **Cost**
  -------------------- ------------------------------------------ ----------
  Nepali Date          Open-source lib                            Free

  Festivals            Official calendar (manual)                 Free

  Holidays             Govt notices                               Free

  Weather              Free API                                   Free

  Gold/Silver          Manual update                              Free

  NEPSE                Manual update                              Free

  Guild                Manual                                     Free
  --------------------------------------------------------------------------

**Total Phase 1 data cost: 0**

**Brutally honest advice**

-   Do **manual + official** in Phase 1

-   Automation comes **after users**

-   Accuracy \> automation early

I'll give you the **correct file tree for Phase-1**, assuming:

-   Frontend: **React / Next.js**

-   Backend: **Django (secure, server-side)**

-   Database: **PostgreSQL / SQLite (Phase-1)**

-   You manually enter data via **Admin Panel**

**✅ Correct Project Structure (Phase-1)**

**🔹 Root Level**

sajilosathi/

├── frontend/

├── backend/

└── docs/

**🔹 FRONTEND (UI ONLY -- No Sensitive Logic)**

frontend/

├── public/

│ ├── icons/

│ ├── logo.png

│ └── manifest.json

│

├── src/

│ ├── api/

│ │ └── index.ts \# Calls backend APIs

│ │

│ ├── components/

│ │ ├── Header.tsx

│ │ ├── Footer.tsx

│ │ ├── Card.tsx

│ │ └── Loader.tsx

│ │

│ ├── pages/

│ │ ├── Home.tsx

│ │ ├── Calendar.tsx

│ │ ├── Weather.tsx

│ │ ├── Gold.tsx

│ │ ├── Nepse.tsx

│ │ └── Sarkari Guide.tsx

│ │

│ ├── styles/

│ │ └── global.css

│ │

│ └── main.tsx

│

└── package.json

🚫 **No Nepali dates, events, prices here**\
Frontend only **fetches data**.

**🔹 BACKEND (WHERE YOUR DATA LIVES)**

backend/

├── manage.py

├── config/

│ ├── settings.py

│ ├── urls.py

│ └── wsgi.py

│

├── apps/

│ ├── calendar/

│ │ ├── models.py

│ │ ├── views.py

│ │ ├── serializers.py

│ │ └── urls.py

│ │

│ ├── weather/

│ │ ├── services.py

│ │ └── views.py

│ │

│ ├── market/

│ │ ├── gold.py

│ │ ├── nepse.py

│ │ └── models.py

│ │

│ ├── Guide/

│ │ ├── models.py

│ │ └── views.py

│ │

│ └── users/

│ └── admin.py

│

├── static/

│ └── admin/

│

└── requirements.txt

**🔹 DATABASE TABLES (Phase-1)**

**📅 Nepali Calendar**

calendar_date

\- bs_year

\- bs_month

\- bs_day

\- ad_date

\- weekday

**🎉 Festivals & Holidays**

festival

\- name

\- bs_date

\- type

\- description

\- is_public_holiday

**🪙 Gold & Silver**

metal_price

\- type (gold/silver)

\- price

\- date

**📈 NEPSE**

nepse_data

\- index_value

\- change

\- date

**🔹 ADMIN PANEL (VERY IMPORTANT)**

Admin panel is where **YOU enter data**.

/admin

├── Add Nepali Dates (once/year)

├── Add Festivals

├── Update Gold/Silver (daily)

├── Update NEPSE (daily)

├── Sarkari Guide

✔ No public access\
✔ Login protected\
✔ Data verified before publish

**🔹 What Goes in assets Folder? (ONLY THIS)**

assets/

├── logo.svg

├── icons/

├── banners/

└── fonts/

❌ No JSON data\
❌ No calendar files\
❌ No prices

**🔐 Security Truth (Important)**

Anyone can view **HTML/CSS/JS** in browser.\
**Security does NOT come from hiding frontend code.**

Security comes from:

-   Backend validation

-   Auth-protected admin

-   API rate limits

-   No keys in frontend

You're thinking right by choosing backend-heavy logic.

**Final Verdict (Straight)**

-   ❌ Assets folder → **NOT for data**

-   ✅ Backend DB → **All real data**

-   ✅ Admin panel → **Manual updates (Phase-1)**

-   ✅ Frontend → **Display only**

**3.1 Public User Features**

  ----------------------------------------------------------------------------
  **Feature**       **Description**                             **Priority**
  ----------------- ------------------------------------------- --------------
  Nepali Calendar   BS date, Tithi, festivals, holidays         High

  Sarkari Guide     Step-by-step government process guides      High

  Weather           Location-based local weather                High

  Gold & Silver     Daily Nepal bullion rates                   High

  NEPSE             Market index + top gainers/losers           High

  Reminders         Festival & personal reminders               Medium
  ----------------------------------------------------------------------------

**3.2 Sarkari Guide Module (Key Differentiator)**

**Covered Processes (Phase 1):**

-   Citizenship certificate

-   Passport (Normal / Urgent)

-   Driving License (new, renewal)

-   PAN Registration

-   National ID

-   SEE / +2 exam processes

**Guide Structure (Mandatory for every guide):**

1.  Kasko lagi ho?

2.  Kaha bata garne?

3.  Required documents

4.  Step-by-step process

5.  Fees

6.  Time required

7.  Common mistakes

8.  Official source link

9.  Last updated date

**4. Admin Panel Features**

**4.1 Authentication & Security**

-   Secure login (email + password)

-   Session timeout

-   Activity logs

**4.2 Content Management**

-   Add/Edit/Delete Sarkari Guides

-   Add/Edit Festivals & Holidays

-   Update Gold/Silver rates

-   Update NEPSE index

-   Bulk upload (CSV/JSON)

**4.3 System Controls**

-   API key management (backend only)

-   Feature toggle ON/OFF

-   App-wide announcements

-   Database backup

**5. Pages & URL Structure (Phase 1)**

  ------------------------------------------------------------------------
  Page              URL                Purpose
  ----------------- ------------------ -----------------------------------
  Home              /                  Daily dashboard

  Calendar          /calendar          Nepali date & festivals

  Sarkari Guide     /sarkari-guide     Government process guides

  Weather           /weather           Local forecast

  Gold & Silver     /gold              Bullion prices

  NEPSE             /nepse             Stock index

  Admin Panel       /admin             Content management
  ------------------------------------------------------------------------

**6. Technical Stack**

**Frontend**

-   **Next.js (React SSR)**

-   Serve\*r-\*rendered HTML for SEO

-   Minimal client-side JS

**Backend**

-   **Laravel (PHP)**

-   All logic, APIs, calculations handled server-side

-   Admin panel secured

**Database**

-   MySQL or PostgreSQL

**Hosting**

-   Railway (Free Tier -- Phase 1)

-   HTTPS enabled

**7. Security Architecture**

-   No API keys in frontend

-   CORS restricted to domain

-   HTTPS enforced

-   Admin panel behind authentication

-   Rate limiting on APIs

**8. Data Sources (Phase 1)**

  ------------------------------------------------------------------------
  Data             Source                                           Cost
  ---------------- ------------------------------------------------ ------
  Nepali Date      Open-source BS libraries                         Free

  Festivals        Official Nepali calendar (manual)                Free

  Weather          OpenWeather / WeatherAPI                         Free

  Gold/Silver      Nepal Gold & Silver Dealers (manual)             Free

  NEPSE            Manual daily update                              Free
  ------------------------------------------------------------------------

**9. SEO Strategy**

-   Fully server-rendered pages

-   Nepali keyword-focused titles & content

-   Clean URLs (/calendar, /sarkari-guide/passport)

-   Structured data (Schema.org: Event, HowTo)

-   Sitemap.xml submitted to Google Search Console

-   Robots.txt blocking /admin

**10. Performance Targets**

-   Page load under 3 seconds (4G)

-   Mobile-first responsive design

-   Lazy loading images

**11. Success Metrics**

-   1,000+ Daily Active Users in 3 months

-   50% 7-day retention

-   Google indexing for core keywords

-   Initial AdSense approval

**12. Phase Roadmap**

This document is **full Phase 1 documentation** for **SajiloSathi**.

**Summary:**

-   **Frontend:** Next.js → safe server-side rendering

-   **Backend:** Laravel → secure business logic & APIs

-   **Database:** MySQL/Postgres → protected

-   **Hosting:** Railway → HTTPS & free

This stack will let your **SajiloSathi app** be **secure, scalable,
SEO-friendly, and ready for Phase 1**.
1. Technical SEO: The "Speed and Indexing" Edge
To outshine a "heavy" app like HamroPatro, SajiloSathi focuses on being "Simpler, Cleaner, and Faster".
• Server-Side Rendering (SSR): Use Next.js or Laravel to deliver pre-rendered HTML. This allows Google to crawl your content instantly, unlike dynamic apps where Google might struggle to index JS-heavy content.
• Performance: Aim for page loads under 3 seconds on 4G. Google ranks fast, mobile-friendly sites higher, and a lightweight "no bloat" experience is your primary competitive advantage.
• Clean URL Structure: Use simple, keyword-rich URLs like sajilosathi.com.np/calendar or sajilosathi.com.np/gold instead of complex strings.
2. Targeting Specific Nepali Keywords
To appear at the top when someone searches for today's date, you must optimize your pages for local intent using specific Nepali keywords:
• Core Keywords: Target phrases like “आजको मिती” (today’s date), “सुन चाँदी मूल्य” (gold silver price), and “NEPSE आज” (NEPSE today).
• Title Tags & Meta Descriptions: Every page should have a unique title, such as <title>Nepali Calendar & Festivals Today | SajiloSathi</title>, and a description that encourages clicks by mentioning festivals, weather, and rates.
• Header Tags (H1, H2): Use H1 tags for the main topic and H2 tags for sub-sections to help Google understand your page hierarchy.
3. Using "Rich Snippets" to Stand Out
Even if you are not rank #1, you can "shine" by having better-looking search results than HamroPatro through Structured Data (Schema.org):
• JSON-LD: Use this code to mark your content so Google can display "Rich Snippets." For example, mark festivals as Events, gold rates as Products with prices, and your guides as HowTo. This makes your search result look more professional and informative, increasing the click-through rate.
4. The "Sarkari Guide" Content Strategy
While HamroPatro is a general utility lead, your Sarkari Guide is your "Key Differentiator".
• High-Intent Traffic: People searching for "how to get a passport in Nepal" or "driving license renewal process" will find your detailed, step-by-step guides.
• Internal Linking: Link your high-traffic pages (like the Calendar) to your Sarkari Guides using anchor text like "Check our guide for National ID registration". This keeps users on your site longer and helps Google crawl all your pages.
5. Increasing Income via SEO
Higher rankings lead directly to more revenue through your Phase 1 model:
• AdSense Revenue: One of your success metrics is "Initial AdSense approval". High organic traffic from SEO is the fastest way to get approved and start earning from ad clicks.
• Sponsored Listings: As your SEO rankings for "Gold price" or "Sarkari Guide" increase, local businesses (like jewelry shops or consultancies) will be more willing to pay for sponsored listings on those specific pages.
• Zero Data Costs: Because you are using manual updates and free APIs for Phase 1, the traffic generated by SEO is essentially pure profit, as your data costs remain at 0.
6. Submission and Monitoring
• Sitemap: Generate a sitemap.xml and submit it to Google Search Console to ensure every page of SajiloSathi is discovered.
• Robots.txt: Use this to allow Google to crawl your tools but block it from sensitive areas like the /admin panel.