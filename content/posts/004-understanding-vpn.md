---
title: 'Understanding VPN (Virtual Private Network)'
date: 2023-03-25 07:00:00
author: 'Sabir Hassan'
image: '../images/vpn.jpg'
image_alt: 'firewall'
tags:
  - vpn
  - security
  - network
---

## What is VPN?

A VPN, or Virtual Private Network, is a type of network technology that allows users to establish a secure and encrypted connection between their device and the internet. Essentially, a VPN creates a private network within a larger network (like the internet) that allows users to transmit data securely and anonymously.

When a user connects to a VPN, their device creates a secure and encrypted "tunnel" between the user's device and the VPN server. This tunnel protects the user's online activity from prying eyes, such as hackers, government surveillance, and internet service providers (ISPs). This can be particularly useful for those who wish to keep their online activity private, such as when using public Wi-Fi networks or accessing websites that may be blocked in certain countries.

Overall, a VPN provides an additional layer of security and privacy to a user's online activities by encrypting their data and making their online activities more anonymous.

## How does a VPN work?

A Virtual Private Network (VPN) establishes a secure and encoded link between two points. In order to establish the VPN connection, both endpoints agree on an encryption key that will be shared between them. This key can either be provided to the user as a password or generated using a key-sharing algorithm.

Once the encryption key is shared, it is utilized to encrypt all data sent over the VPN connection. For instance, when a client machine sends data, it gets encrypted and transmitted to the other VPN endpoint where it gets decrypted and then sent on to its intended destination. When the destination server sends a response, the entire process is reversed.

## Types of VPNs

VPNs are created to offer a secure and encrypted link between two locations, but they do not specify what these locations should be. Therefore, VPNs can be used in several different scenarios.

- **Site-to-Site VPN**: A site-to-site VPN is intended to establish a secure connection between two geographically-separated locations. Today, most security gateways come equipped with VPN functionality, such as a next-generation firewall (NGFW) situated at the network perimeter, which safeguards the corporate network while serving as a VPN gateway. Traffic between the two sites is routed through this gateway, which encrypts the data and transmits it to the other gateway at the other site. The receiving gateway then decrypts the data and forwards it to its intended destination.

- **Remote Access VPN**: A remote access VPN is created to securely connect remote users to a corporate network. For example, when the COVID-19 pandemic emerged in 2020, numerous organizations moved to a remote workforce and set up secure remote access VPNs for their remote clients to connect to critical business operations at the corporate site.

- **VPN as a Service**: A VPN as a Service, also known as a cloud VPN, is a VPN that is hosted in cloud-based infrastructure. In this model, packets from the client enter the Internet from the cloud infrastructure instead of the client's local address. This approach is frequently used in consumer VPNs, allowing users to protect themselves while connecting to the Internet via insecure public Wi-Fi and providing some level of anonymity while accessing the Internet.

## Benefits of a VPN

VPNs offer several advantages to both individual users and organizations, such as:

- **Access Control**: Many organizations have systems and resources that are only meant to be accessible to internal users. A VPN allows remote users or sites to obtain "internal" access to these resources since the VPN endpoint is located inside the network firewall. This makes it feasible to grant access to authorized remote users without exposing these resources to the public.

- **Security**: VPNs create an encrypted connection between the user/device and the destination network, ensuring that all data transmitted is protected from prying eyes.

- **Privacy**: VPNs mask the user's IP address, providing anonymity and preventing websites and services from tracking their online activities.

- **Remote Access**: VPNs enable remote workers to connect securely to their company's network, allowing them to access company resources and applications from anywhere.

- **Access to Geo-Restricted Content**: VPNs can allow users to bypass geographic restrictions and access content that may be restricted in their region.

- **Cost Savings**: VPNs can be a cost-effective solution for organizations that need to provide remote access to their employees without having to invest in expensive hardware and infrastructure.

- **Flexibility**: VPNs can be used on a variety of devices and platforms, including laptops, smartphones, and tablets, making them a versatile solution for users who need to access the Internet from different locations and devices.

## Is a VPN Secure?

VPNs utilize cryptography to offer security and privacy guarantees, allowing them to satisfy the three criteria of information security:

- **Confidentiality**: Encryption is utilized to safeguard data privacy by encrypting all data transmitted over the public network.

- **Message Integrity**: Message authentication codes (MACs) ensure that any alterations or errors in transmitted data are detectable. This helps to detect when a message has been tampered with or interfered with in some way, either intentionally or unintentionally.

- **Authentication**: The initial authentication and key sharing process authenticate the identity of both endpoints of the VPN connection, preventing unauthorized use of the VPN.

By delivering all of the elements of the "CIA triad," VPNs guarantee a secure and private connection for their users.

## Limitations and Security Risks of VPNs

VPNs are not a flawless solution, as they have a number of limitations that affect their usability and corporate cybersecurity. These include:

- **Fragmented Visibility**: VPNs provide secure point-to-point connectivity, making it tough for an organization's security team to maintain complete network visibility for effective threat detection and response.

- **No Integrated Security**: An organization must deploy additional security solutions behind the VPN to identify and block malicious content and implement additional access controls.

- **Inefficient Routing**: VPNs may take a detour in a "hub and spoke" model to ensure that all traffic passes through the organization's centralized security stack for inspection. As remote work and cloud applications become more prevalent, this may not be the optimal path between the client and the cloud application or the Internet.

- **Poor Scalability**: As a point-to-point security solution, VPNs scale poorly. For example, the number of site-to-site VPN connections in a fully-connected network grows exponentially with the number of sites, creating a complex network infrastructure that is difficult to deploy, monitor, and secure.

- **Endpoint Vulnerabilities**: Endpoints with legitimate VPN access can sometimes be compromised through phishing and other cyber attacks. Since the endpoint has full access to VPN resources, so does the threat actor who has compromised the endpoint.
