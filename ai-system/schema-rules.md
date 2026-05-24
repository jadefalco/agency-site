# SCHEMA RULES
# STRUCTURED DATA IMPLEMENTATION GUIDE

Purpose:
Implement structured data that helps:
- Google understand the website
- AI systems interpret business information
- improve rich search results
- improve local SEO
- improve GEO (AI discoverability)

Structured data should:
- be accurate
- be consistent
- match visible page content
- use valid JSON-LD

Preferred format:
- JSON-LD

Avoid:
- outdated microdata approaches
- inaccurate schema
- spammy schema stuffing

---

# CORE SCHEMA PRINCIPLES

Schema should:
- describe real content
- reflect visible information
- improve semantic clarity
- strengthen entity understanding

Never:
- fake reviews
- inflate ratings
- create misleading schema
- add irrelevant schema types

---

# REQUIRED SCHEMA TYPES

Most local business websites should use:

1. LocalBusiness
2. Service
3. FAQPage
4. BreadcrumbList
5. Review/Testimonial schema when appropriate

Optional:
- Organization
- WebSite
- Article
- Person
- VideoObject

---

# LOCALBUSINESS SCHEMA

Most important schema for local businesses.

Include:
- business name
- address
- phone number
- website URL
- hours
- service area
- logo
- image
- business type

Example fields:
- "@type": "LocalBusiness"
- "name"
- "telephone"
- "address"
- "openingHours"
- "areaServed"

Important:
NAP data must match:
- website
- Google Business Profile
- directories

NAP =
- Name
- Address
- Phone

---

# SERVICE SCHEMA

Use for:
- plumbing
- HVAC
- electrical
- roofing
- landscaping
- cleaning
- and all service offerings

Each major service page should include:
- service name
- description
- service area
- provider
- service type

Good examples:
- Drain Cleaning
- Emergency Plumbing
- Furnace Repair

Avoid:
- vague service names

---

# FAQPAGE SCHEMA

Use FAQ schema whenever pages contain:
- customer questions
- pricing questions
- service questions
- process explanations

FAQs should:
- exist visibly on page
- match schema exactly
- provide concise answers

Avoid:
- hidden FAQ spam
- excessive repetitive questions

Good FAQ topics:
- pricing
- timelines
- service areas
- emergency availability
- warranties

---

# BREADCRUMB SCHEMA

Use breadcrumbs on:
- service pages
- city pages
- blog pages

Purpose:
- improve navigation clarity
- improve semantic hierarchy
- help search engines understand structure

Example hierarchy:
Home > Services > Drain Cleaning

---

# REVIEW SCHEMA

Only use:
- real reviews
- authentic ratings
- visible testimonials

Avoid:
- fake ratings
- inflated stars
- misleading aggregate reviews

When possible include:
- reviewer name
- rating
- review body

---

# WEBSITE SCHEMA

Use:
- WebSite schema
- Organization schema

Can include:
- business name
- URL
- search functionality
- logo

Purpose:
- strengthen entity understanding
- reinforce brand identity

---

# ORGANIZATION SCHEMA

Useful for:
- larger businesses
- established brands
- multi-location companies

Can include:
- logo
- social profiles
- contact information
- founding date

---

# SERVICE AREA SCHEMA

For local businesses, clearly define:
- cities served
- regions served
- geographic coverage

Examples:
- Kelowna
- West Kelowna
- Vernon
- Penticton
- Lake Country

Avoid:
- unrealistic nationwide coverage claims

---

# GEO / AI SEARCH BENEFITS

Structured data helps AI systems:
- identify entities
- understand relationships
- extract answers
- summarize services
- understand locations

Schema improves:
- AI discoverability
- semantic clarity
- trust signals

---

# JSON-LD RULES

Preferred implementation:
- JSON-LD in script tags

Avoid:
- malformed JSON
- duplicate schema conflicts
- invalid syntax

Schema should:
- validate successfully
- remain readable
- stay organized

---

# HOMEPAGE SCHEMA REQUIREMENTS

Homepage should usually include:
- LocalBusiness
- Organization
- WebSite

Optional:
- FAQPage

Homepage schema should reinforce:
- business identity
- service area
- trust
- contact info

---

# SERVICE PAGE SCHEMA REQUIREMENTS

Service pages should include:
- Service schema
- Breadcrumb schema
- FAQ schema when applicable

Schema should:
- match service topic
- reinforce local relevance
- support search intent

---

# FAQ PAGE RULES

FAQ schema should:
- match visible questions
- provide concise answers
- avoid spam

Good FAQ style:
Q: Do you offer emergency plumbing in Kelowna?
A: Yes, we provide 24/7 emergency plumbing services throughout Kelowna and surrounding areas.

---

# MULTI-LOCATION BUSINESSES

For businesses serving multiple cities:
- use service area schema carefully
- create localized pages
- maintain consistent NAP data

Avoid:
- duplicate city-page schema spam

---

# IMAGE SCHEMA RULES

Images referenced in schema should:
- exist publicly
- be high quality
- match page content

Prefer:
- logos
- branded photos
- real business images

Avoid:
- generic stock images

---

# TECHNICAL SCHEMA RULES

Verify:
- schema validates
- no duplicate conflicts
- proper nesting
- proper syntax
- proper escaping

Test with:
- Google Rich Results Test
- Schema validators

---

# SCHEMA IMPLEMENTATION PRIORITIES

Highest priority:
1. LocalBusiness
2. Service
3. FAQPage
4. BreadcrumbList

Secondary:
5. Review
6. Organization
7. WebSite

---

# COMMON SCHEMA MISTAKES

Avoid:
- fake reviews
- invisible FAQ spam
- incorrect business info
- conflicting phone numbers
- invalid JSON syntax
- schema not matching page content

Avoid over-optimization.

Schema should support content — not manipulate rankings.

---

# FINAL SCHEMA VALIDATION

Before launch verify:
- JSON-LD validates
- NAP data matches everywhere
- schema matches visible content
- service schema matches services
- FAQ schema matches visible FAQs
- breadcrumbs are accurate
- no duplicate/conflicting schema

The schema implementation should:
- improve semantic clarity
- strengthen local SEO
- improve GEO discoverability
- help AI systems understand the business