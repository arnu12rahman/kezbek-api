# Kezbek API

Kezbek API is a new solution back-end system that helps Kezbek manage business at scale. With this API Kezbek can have:

- Handle more transactions submission from all Kezbek Partner
- More efficient money generator services
- New B2B cashback workflow for customer transaction
- New technology to facilitate future development

As per this document is created

- Kezbek will not manage customer (just save transaction history), product, and partner that can use Kezbek workflow.
- Kezbek does not regulate the use of cashback given to the customer's wallet
- Kezbek only save to wallet service as simulation

<br>

## Contents

---

- [Technology Background](#technology-background)
  - [Repo Architecture](#repo-architecture)
  - [Technology Architecture](#technology-architecture)
  - [Data Structure](#data-structure)
  - [System Migration](#system-migration)
- [Documentation](#documentation)
  - [Installation](#installation)
  - [Unit Test](#installation)
  - [Swagger Doc](#swagger-doc)

<br>

## #Technology Background

#### Repo Architecture

---

As system, Kezbek API/Apps is a whole system that is integrated with one another by implementing the monorepo microservices architecture.
Why use monorepo?

<div style="text-align:center">
  <img src="https://github.com/arnu12rahman/kezbek-api/blob/master/doc/Monorepo.jpg?raw=true" alt="Monorepo" style="width:300px;text-align:center;"/>
</div>
There are some opinions as to how the advantages of using a monorepo architecture are according to the 2 articles from <a href="https://vercel.com/blog/monorepos">vercel</a> and <a href="https://notes.burke.libbey.me/metarepo/#monorepo-architecture">Burke Libbey</a>:

- Discovery
- Simplified Dependencies
- Dependency Rot (or lack thereof)
- Tooling

Also because Monorepos is a code base that contains multiple projects, and often multiple frameworks as well, in one unified code repository. So instead of having 100+ separate repositories it is better to consolidate to monorepos for several reasons:

- Easier updates across packages
- Easier collaboration and debugging
- Easier local development
- Faster builds with remote caching

\*another reference: <a href="https://monorepo.tools">Monorepos</a>

#### Technology Architecture

---

In terms of technology Kezbek API/Apps uses several technologies to structure its services as follows

<div style="text-align:center">
  <img src="https://github.com/arnu12rahman/kezbek-api/blob/master/doc/ServiceArchitecture.jpg?raw=true" alt="Monorepo" style="width:800px;text-align:center;"/>
</div>

- <b>JWT</b> for authentication between service because JWT is secure, as it can be digitally signed using a secret (with one of the supported algorithms) or a public-private key using RSA. <a href="https://www.techwell.com/techwell-insights/2021/12/why-use-json-web-token-jwt-authentication">Reference</a>
- <b>RabbitMq</b> for message brocker because RabbitMQ is perfect for web servers that need rapid request-response. It also shares loads between workers under high load (20K+ messages/second). RabbitMQ can also handle background jobs or long-running tasks. <a href="https://www.simplilearn.com/kafka-vs-rabbitmq-article">Reference</a>
- <b>MongoDB</b> for database system because MongoDB has become one of the most <a href="https://www.mongodb.com/blog/post/mongodb-the-most-wanted-database-by-developers-for-the-4th-consecutive-year">wanted databases</a> in the world because it makes it easy for developers to store, manage, and retrieve data when creating applications with most programming languages.
- Amazon SES for mailer / notification because Amazon SES is a cloud email service provider that can integrate into any application for bulk email sending. Whether you send transactional or marketing emails, you pay only for what you use. <a href="https://aws.amazon.com/ses/#:~:text=Why%20Amazon%20SES?,shared,%20or%20owned%20IP%20addresses.">Reference</a>
- Swagger for documentation because helps to understand how API works for the client side of an application. <a href="https://blog.logrocket.com/documenting-express-js-api-swagger/#benefits-using-swagger">Reference</a>

#### Data Structure

---
<div style="text-align:center">
  <img src="https://github.com/arnu12rahman/kezbek-api/blob/master/doc/dbKezbek.jpg?raw=true" alt="Monorepo" style="width:800px;text-align:center;"/>
</div>

#### System Migration

---
To generate tables on the schema and data processing, we will use the init file in docker-compose/mongo-init. Data migration will be automated when running the docker-compose up command.

<br>

## #Documentation
#### Installation

---
Enter the project folder using the command `cd`

```
cd kezbek-app
```

Build the image using the command `docker build -t`

```
docker build -t kezbek-app .
```

Running container/service api and database with `docker compose`

```
docker compose up -d
```

For Test with `npm run test`

```
npm run test
```

#### Swagger Doc

---
After running the application and running properly Swagger documentation can be seen at the following link:
- <a href="http://localhost:3005/doc">Auth</a>
- <a href="http://localhost:3000/doc">Transactions</a>
- <a href="http://localhost:3001/doc">Cashbacks</a>
- <a href="http://localhost:3002/doc">Rewards</a>
- <a href="http://localhost:3003/doc">Partners</a>
- <a href="http://localhost:3004/doc">Wallets</a>

*Don't forget to to create and complete the .env file before testing or running the application.