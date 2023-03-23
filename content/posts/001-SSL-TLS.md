---
title: 'What is SSL/TLS? And How it works?'
date: 2023-03-22 07:00:00
author: 'Sabir Hassan'
image: '../images/ssl-tls.png'
image_alt: 'ssl-tls'
tags:
  - ssl
  - tls
  - encryption
  - client-server
  - communication
---

## What is SSL/TLS encryption?

SSL is an internet security protocol used to secure communication between internet users and web servers. However, the SSL protocol is currently deprecated. [Transport Layer Security (TLS)](understanding-tls-transport-layer-security) is SSL’s successor. TLS was developed by the Internet Engineering Task Force (IETF) and is the correct term that people should start using.

## How Does SSL/TLS Encryption Work?

SSL/TLS uses both asymmetric and symmetric encryption to protect the confidentiality and integrity of data-in-transit. Asymmetric encryption is used to establish a secure session between a client and a server, and symmetric encryption is used to exchange data within the secured session.

A website must have an SSL/TLS certificate for their web server/domain name to use SSL/TLS encryption. Once installed, the certificate enables the client and server to securely negotiate the level of encryption in the following steps:

1. The client contacts the server using a secure URL (HTTPS…).
2. The server sends the client its certificate and public key.
3. The client verifies this with a Trusted Root Certification Authority to ensure the certificate is legitimate.
4. The client and server negotiate the strongest type of encryption that each can support.
5. The client encrypts a session (secret) key with the server’s public key, and sends it back to the server.
6. The server decrypts the client communication with its private key, and the session is established.
7. The session key (symmetric encryption) is now used to encrypt and decrypt data transmitted between the client and server.

Both the client and server are now using HTTPS (SSL/TLS + HTTP) for their communication.

Once you leave the website, those keys are discarded. On your next visit, a new handshake is negotiated, and a new set of keys are generated.
