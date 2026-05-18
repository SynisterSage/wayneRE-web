# AGENTS.md

## Project Overview

This project is a complete redesign of WayneNJRealEstate.com.

The website represents a boutique real estate brand focused on:
- Wayne, New Jersey
- Packanack Lake
- surrounding Wayne neighborhoods

The redesign should feel:
- editorial
- modern
- warm
- local
- strategic
- architectural
- lifestyle-aware
- premium without being flashy

This is NOT a generic realtor website.

The goal is to create a highly polished, highly intentional local real estate experience that feels custom-built, trustworthy, calm, and human.

---

# Core Brand Direction

## Brand Personality

The website should feel like:
- a knowledgeable local advisor
- a boutique real estate strategist
- a neighborhood-focused editorial brand
- a calm premium service
- a modern local publication

NOT:
- a corporate brokerage
- a Zillow clone
- a cold luxury developer
- a lead-farm website
- a generic AI-generated landing page

---

# Tone & Voice

## The voice should be:
- grounded
- local
- informed
- calm
- strategic
- neighborly
- concise
- editorial

## Avoid:
- hype-heavy marketing
- salesy language
- fake urgency
- vague “luxury” phrasing
- startup/SaaS tone
- corporate real estate clichés

## NEVER use phrases like:
- Find your dream home
- Unlock your next chapter
- Buy. Sell. Invest.
- Luxury experience
- Seamless journey
- Elevate your lifestyle
- Top dollar guaranteed
- Your journey starts here
- White-glove service
- Redefining real estate

---

# Design Philosophy

## The website should feel:
- typography-led
- spacious
- image-conscious
- calm
- architectural
- editorial
- intentionally restrained

## Inspiration Sources
Think:
- boutique hospitality websites
- architectural journals
- editorial magazines
- modern interior design brands
- luxury lifestyle publications
- high-end local businesses

NOT:
- generic realtor templates
- busy dashboards
- overly animated startup websites
- Webflow clone aesthetics
- excessive gradients/cards/shadows

---

# Layout Principles

## Prioritize:
- whitespace
- readable rhythm
- clean hierarchy
- asymmetrical layouts
- strong typography scale
- thoughtful image placement
- subtle motion only where useful

## Avoid:
- clutter
- giant card grids
- excessive carousels
- too many buttons
- over-layered UI
- floating glassmorphism everywhere
- excessive borders/shadows

---

# Typography System

## Heading Font
Elegant editorial serif.

Recommended:
- Cormorant Garamond
- Canela
- Playfair Display
- Bodoni Moda
- Instrument Serif

## Body Font
Clean modern sans-serif.

Recommended:
- Inter
- Manrope
- Suisse Int’l
- Plus Jakarta Sans
- General Sans

---

# Typography Scale

## H1
Desktop:
- 72–96px
- line-height: 0.95–1.0

Mobile:
- 48–56px

## H2
Desktop:
- 48–64px

Mobile:
- 36–42px

## H3
Desktop:
- 28–36px

## Body
Desktop:
- 18–20px
- line-height: 1.6–1.8

Mobile:
- 16–18px

## Small Labels
- uppercase
- letter-spacing
- restrained usage

---

# Spacing System

Use generous spacing.

## Section Padding
Desktop:
- 120–180px vertical

Tablet:
- 80–120px

Mobile:
- 64–96px

## Content Widths
- max-width: 1200–1400px
- text blocks: 550–700px

## Grid Rhythm
Prefer:
- 12-column layouts
- asymmetry
- image/text balance

Avoid:
- perfectly centered everything
- cramped sections

---

# Color Direction

## Primary Palette
- warm white
- off-white
- charcoal
- muted black
- soft stone

## Accent Palette
Subtle:
- lake-inspired deep blue
- muted green
- warm taupe

## Avoid
- neon accents
- loud gradients
- overly saturated luxury colors

---

# Imagery Direction

## Images should feel:
- local
- Northeast
- seasonal
- architectural
- lifestyle-oriented
- natural
- grounded

## Prioritize:
- Wayne neighborhoods
- Packanack Lake
- tree-lined streets
- tasteful interiors
- subtle luxury
- natural lighting
- lifestyle moments

## Avoid:
- Miami/LA mansion imagery
- fake luxury stock photos
- generic smiling realtor photos
- over-filtered photography

---

# UX Rules

## Navigation
Navigation should feel:
- minimal
- clear
- calm
- editorial

Avoid:
- oversized navbars
- sticky clutter
- CTA overload

---

# CTA Philosophy

CTAs should feel:
- soft
- confident
- conversational
- strategic

Examples:
- Explore Wayne & Packanack
- Start With a Conversation
- View Local Listings
- See the Seller Strategy
- Explore Your Options

Avoid:
- Schedule Now
- Get Started Today
- Claim Your Consultation
- Limited Availability

---

# Animation Rules

Use animation sparingly.

## Allowed:
- subtle fade-ins
- image reveal
- gentle hover states
- smooth page transitions
- restrained parallax

## Avoid:
- excessive motion
- bouncing elements
- animated counters
- flashy hero animations
- unnecessary microinteractions

---

# React Architecture

## Use:
- React + Vite
- modular component architecture
- reusable sections
- semantic HTML
- maintainable folder structure

## Suggested Structure

/src
  /components
    /layout
    /sections
    /ui
  /pages
  /styles
  /data
  /hooks
  /assets

---

# Routing Requirements

IMPORTANT:
This site should NOT behave like a single-page scrolling app.

Use REAL routed pages.

## Required Pages
- /
- /about
- /buy
- /sell
- /packanack-lake
- /wayne-nj
- /blog
- /contact

Potential future:
- /neighborhoods/*
- /listings/*
- /market-updates/*
- /guides/*

---

# SEO Requirements

SEO is CRITICAL.

This site is heavily dependent on local SEO.

## Every page MUST have:
- unique title
- unique meta description
- semantic heading structure
- proper image alt text
- internal linking
- local keyword relevance

---

# Local SEO Focus

Target:
- Wayne NJ real estate
- Packanack Lake homes
- Wayne NJ realtor
- Packanack Lake real estate
- Wayne NJ homes for sale
- moving to Wayne NJ
- Wayne NJ neighborhoods
- Packanack lifestyle

## SEO Strategy
Pages should target:
- neighborhood-specific keywords
- lifestyle searches
- relocation searches
- buyer education
- seller education
- seasonal local searches

---

# Technical SEO

## Required
- React Helmet (or equivalent)
- proper canonical tags
- Open Graph metadata
- sitemap
- robots.txt
- fast Core Web Vitals
- optimized images
- lazy loading

## Avoid
- giant JS bundles
- oversized animations
- unoptimized image payloads
- layout shift

---

# Accessibility

Must follow:
- semantic HTML
- keyboard navigation
- proper contrast
- alt text
- accessible forms
- visible focus states

---

# Mobile Experience

Mobile is NOT secondary.

The mobile experience should feel:
- elegant
- spacious
- readable
- calm
- intentional

## Mobile Rules
- stack intelligently
- preserve typography hierarchy
- reduce clutter
- maintain spacing rhythm
- avoid giant hero heights
- avoid oversized text blocks

---

# Component Philosophy

Components should:
- be modular
- be reusable
- avoid prop bloat
- maintain visual consistency

Avoid:
- giant monolithic components
- duplicated section logic
- inline styles
- excessive utility chaos

---

# Copywriting Rules

Copy should:
- sound human
- feel local
- provide value
- remain concise
- avoid filler

The site should sound like:
a smart local advisor who deeply understands Wayne and Packanack — not a marketer.

---

# Homepage Structure

Recommended homepage flow:

1. Hero
2. Local positioning statement
3. Buyer/Seller pathways
4. Packanack lifestyle section
5. Seller strategy section
6. Buyer guidance section
7. Featured content/blog
8. Testimonials
9. Consultation CTA
10. Footer

---

# Final Rule

Before implementing any design or copy:

Ask:
“Does this feel custom, local, editorial, calm, and human?”

If it feels:
- templated
- generic
- over-marketed
- too luxurious
- too startup-like
- too AI-generated

Then simplify and refine.