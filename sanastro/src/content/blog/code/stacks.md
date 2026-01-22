---
cover: "../../../assets/blog/code/stacks/cover.png"
coverAlt: "stacks"
# banner: "../../../assets/blog/code/stacks/banner.png"
# bannerAlt: "stacks"

title: "stacks"
description: "System design references and practice."
# author:
publicationDate: 2025-07-20
# creationDate: "July 2025"
sortOrder: 5
---

# Premise

With my (currently) limited experience in working on large cloud-based systems or services that scale, I thought it'd be useful (and fun!) to roleplay a bunch of scenarios where I design exactly those.

Each section starts with a problem α that's usually a task recreating a widely used service. Complexity should generally increase further down the list.

1. # Notes

### Design a mobile app for notes

Starting with something very simple.

1. Build native front-end using Swift or Kotlin and Jetpack Compose. Alternatively Flutter or React Native.
2. Connect to an external PostgreSQL server to store notes. Should at least have ID, title, and content, which can be in markdown or plaintext. A relational database is okay because it shouldn't have to be normalised that much or often.

### This doesn't work when the user is offline

Instead of an external DB, use SQLite with something like Drift on the client's device. No need to run a server on-device since its the entire database would be stored as one binary file with no need for compute.

### This doesn't scale

Indeed this solution doesn't scale too well with large datasets. It cannot handle concurrent writes as well, but these aren't issues with the product where one user will be writing their own notes.

### User cannot access notes over the network (sync)

We can maintain the SQLite database to read and write locally for better latency, but can sync to the PostgreSQL server when there is an Internet connection. This should be simple as localDB packages like Drift or Hive can work with backend services smoothly. Auth is trivial. Conflict management could simply be offline priority, or last-write-wins, without having to struggle with something more complicated like CRDTs.

2. # Weather

### Design the back-end for a weather app

Direct connection from front-end to a third party API.

### API keys are exposed and there isnt much you can do to handle errors

Create a simple proxy API to catch failures. We don't need a server for this so something like ECS Fargate should work. ExpressJS is suitable here since it's pretty lightweight and easy to set up over making one from scratch with pure Node.

### API rate limits when scaled

True. Cache the data using Elasticache or Redis itself if we're not using Fargate. Cache is appropriate since weather data doesn't have to be stored—time to live could be a few minutes. Write some super easy logic to check cache first when proxy API is called by the client. Only call the third party API if requested data is not already in cache.