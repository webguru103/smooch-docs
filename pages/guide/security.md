---
title: Security
section: guide
layout: two-column
---

## Physical Security

#### Servers

Smooch services are hosted on Amazon Web Services (AWS). As such, Smooch inherits the control environment which Amazon maintains and demonstrates via SSAE16 SOC 1, 2 and 3, ISO 27001 and FedRAMP/FISMA reports and certifications. Web servers and databases run on servers in secure data centers. Physical access is restricted to authorized personnel. Premises are monitored and access is logged.
You can read more about AWS security on their [security page](https://aws.amazon.com/security/)

#### Monitoring

All systems are constantly monitored by both Smooch and our service providers.

#### Location

Smooch is currently hosted in the United States.

## Network Security

#### On-Call Team

Our DevOps and Security Team is on call 24/7 to respond to security alerts and events.

#### Protection

Our network is protected by secure HTTPS transport over public networks.

#### Logical Access

Access to the Smooch Production System is restricted by an explicit need-to-know basis, utilizes least privilege, is frequently audited and monitored, and is controlled by our DevOps Team. Employees accessing the Smooch Production System are required to use multiple factors of authentication.

#### Security Incident Response

In case of a system alert, events are escalated to our 24/7 DevOps and InfoSec teams providing Operations, Network Engineering, and Security coverage.

## Encryption

#### Encryption In Transit

Communications between you and Smooch servers are encrypted via industry best-practices HTTPS and Transport Layer Security (TLS).
“A” score against [ssllabs.com security tests](https://www.ssllabs.com/ssltest/analyze.html?d=api.smooch.io&latest).

#### Encryption At Rest

Smooch supports encryption of customer data at rest.

## Availability & Continuity

#### Uptime

Smooch maintains a publicly available [system-status webpage](http://status.smooch.io) that includes system availability details, scheduled maintenance, service incident history, and relevant security events, hosted separately from the Smooch System.

#### Redundancy

The Smooch system architecture makes use of multiple availability zones to minimize single points of failure.
Our strict backup regime ensures customer data is actively replicated across systems and between AWS S3 availability zones.

## Secure Development (SDLC)

#### Node.JS Security Controls

We review top security flaws. These include inherent controls that reduce our exposure to Cross Site Scripting (XSS), Cross Site Request Forgery (CSRF), among others. Tools used include Snyk.io, nsp and OWASP Top Ten.

#### Peer Review

Our full-stack developers write unit-tests and QA each other’s development code before every release identifying, testing and triaging application issues and security vulnerabilities.

#### Separate Environments

Testing and staging environments are separated logically from the production environment. No actual customer data is used in the development or test environments.

#### Authentication

Only the account administrator can login to the console to administer the configurations and integrations.     

#### Secure Credential Storage

Smooch stores user passwords through a secure SOC 2 compliant third-party and does not store these credentials in our database.

#### API Security & Authentication

Smooch API is SSL-only and you must be a verified user to make API requests. You can authorize against the API using either basic authentication with your username and password, or with a JWT signed request.

## Employee Vetting

#### Background Checks

Smooch performs background checks on all new employees in accordance with local laws. These checks are also required to be completed for contractors.

#### Confidentiality Agreements

All new hires are screened through the hiring process and required to sign Non-Disclosure and Confidentiality agreements.
