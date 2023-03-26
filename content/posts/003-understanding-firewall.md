---
title: 'Understanding Firewall'
date: 2023-03-24 07:00:00
author: 'Sabir Hassan'
image: '../images/firewall.jpg'
image_alt: 'firewall'
tags:
  - firewall
  - security
  - network
---

## What is firewall?

A Firewall is a network security system that monitors and filters incoming and outgoing network traffic based on an organization’s previously established security policies. At its most basic, a firewall is essentially the barrier that sits between a private internal network and the public Internet. A firewall’s main purpose is to allow non-threatening traffic in and to keep dangerous traffic out.

Firewalls are essentially gateways or borders that regulate the flow of authorized and unauthorized internet activity within a private network. The term "firewall" originated from the concept of physical walls being used as barriers to prevent the spread of fire until emergency services arrive. In the context of network security, firewalls are designed to manage internet traffic with the goal of slowing down the propagation of online threats.

To manage internet traffic, firewalls establish "choke points" where traffic is funneled and reviewed based on predetermined parameters. In some cases, firewalls also keep track of internet traffic and connections in audit logs to keep a record of what has been permitted or blocked.

Firewalls are typically employed to regulate access to private networks and host devices, and are therefore a type of user access control tool. These barriers are usually set up in two locations: on dedicated computers within the network or directly on user computers and other endpoints such as hosts.

## How does firewall works?

A firewall acts as a barrier separating an external network from the network it protects. It is placed in the path of a network connection and monitors all packets entering and leaving the safeguarded network. While inspecting the packets, the firewall utilizes a pre-configured set of rules to differentiate between malicious and harmless packets.

"Packets" refer to fragments of information that are formatted for transfer over the internet. These packets carry both the data and information about the data's source. Firewalls use this information to determine whether a given packet complies with the rule set. If it does not, the firewall prevents it from entering the safeguarded network.

Rule sets can be created based on various packet data attributes such as

- origin,
- destination
- content

These characteristics may be represented differently at different network levels. As a packet travels through the network, it undergoes multiple transformations to indicate the protocol where to send it. Different types of firewalls are designed to read packets at distinct network levels.

## Types of Firewall

Firewalls can be classified based on either their filtering method or the system they safeguard.

When classified according to what they protect, firewalls fall into two types:

- **Network-based**: network-based firewalls are responsible for safeguarding entire networks and are usually hardware-based.
- **Host-based**: On the other hand, host-based firewalls are responsible for securing individual devices, also known as hosts, and are typically software-based.

</br>
When classified based on their filtering method, there are four main types of firewalls:

- **Packet-filtering firewall**: This type of firewall examines individual packets in isolation and does not consider the packet's context.

- **Stateful inspection firewall**: Stateful inspection firewalls analyze network traffic to determine if a given packet is related to another packet in the same connection.

- **Proxy firewall (also known as an application-level gateway)**: Proxy firewalls inspect packets at the application layer of the Open Systems Interconnection (OSI) reference model, which allows for more thorough inspection of network traffic.

- **Next Generation Firewall (NGFW)**: NGFWs use a multilayered approach that combines traditional firewall capabilities with additional features such as intrusion prevention systems (IPS) and application control. This integration provides a higher level of security and control for enterprise networks.

Each type of firewall in the list examines network traffic with a higher level of context than the one before it.

Packet-filtering firewalls examine individual packets in isolation and do not consider the packet's context. In contrast, stateful inspection firewalls analyze network traffic to determine if a given packet is related to another packet in the same connection. This added context allows stateful inspection firewalls to provide a higher level of security than packet-filtering firewalls.

Proxy firewalls inspect packets at the application layer of the OSI model, which provides even more context than stateful inspection firewalls. By analyzing traffic at this layer, proxy firewalls can provide granular control over the applications and services that are allowed to pass through the firewall.

Finally, NGFWs use a multilayered approach that combines traditional firewall capabilities with additional features such as intrusion prevention systems and application control. This integration provides the highest level of security and control, allowing for more granular policy enforcement and greater protection against emerging threats.

### Packet-filtering firewalls

A packet-filtering firewall examines each packet in isolation and checks its source and destination address, protocol, and destination port number against a set of pre-configured rules. If the packet does not comply with the firewall's rule set, it is dropped and not forwarded to its destination.

Packet-filtering firewalls work primarily on the network layer of the OSI reference model, although the transport layer is used to obtain the source and destination port numbers. As the packet-filtering firewall processes each packet in isolation, it cannot determine whether a given packet is part of an existing stream of traffic. This lack of context makes packet-filtering firewalls vulnerable to IP spoofing attacks.

Although packet-filtering firewalls are effective, they have largely been replaced by stateful inspection firewalls, which provide a higher level of security by examining network traffic in the context of an ongoing stream of traffic. Stateful inspection firewalls can recognize when packets are part of a session and can apply rules based on the state of that session, which makes them more effective against certain types of attacks.

### Stateful inspection firewalls

Stateful inspection firewalls assume that established connections are safe, which can make them vulnerable to DoS attacks that take advantage of these connections. DoS attacks can flood a network with traffic, overwhelming the firewall and causing it to crash or become unresponsive. To prevent DoS attacks, stateful inspection firewalls often have features such as rate limiting and connection limits to restrict the amount of traffic that can pass through. Additionally, other security measures, such as intrusion prevention systems (IPS), may be used in conjunction with stateful inspection firewalls to provide comprehensive protection against DoS attacks.

### Application layer and proxy firewalls

Application layer firewalls can inspect the contents of packets and distinguish between valid requests and malicious code disguised as a valid request. This level of inspection provides more granular control over network traffic and allows for the blocking of specific content, such as known malware or certain websites. The use of a proxy server with an application layer firewall also creates an additional layer of security, making it harder for attackers to discover the network's location.

### Next generation firewalls (NGFW)

This type is a combination of the other types with additional security software and devices bundled in. Each type has its own strengths and weaknesses, some protect networks at different layers of the OSI model. The benefit of a NGFW is that it combines the strengths of each type cover each type's weakness. An NGFW is often a bundle of technologies under one name as opposed to a single component.
