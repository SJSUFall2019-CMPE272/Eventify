# Eventify

## Group Members :
1. [Naman Agrawal](https://github.com/agrawalnaman)
2. [Chaitanya Naik](https://github.com/chets619)
3. [Ayushman Mittal](https://github.com/ayushman264)
4. [Akshit Ahuja](https://github.com/ahuja101992)

# ABSTRACT : 

Organizers of all large Conventions, Conferences and Trade Fairs face the perennial problem of tracking the movement of people between different rooms in an event for extracting meaningful insight from it. Also, in events, attendees tend to get confused due to a large number of events concurrently going on at the location.
 
Our motive is to provide a one-stop solution to this with an innovative application of RFID systems in which readers will be strategically placed throughout the various event rooms capturing and tracking each attendee's activities.
 
Attendees will have a mobile web application that will present real-time details of the entire conference and the ongoing event in the room that he is currently present.
 
After the conclusion of the event, the system will generate a report for the organizers with lead details for each vendor and review the performance of a guest speaker or lecturer. The report will also contain other key details like how many attendees visited a room, how much time they spent in it thereby revealing a list of potential customers for vendors at the event.

# Architecture Diagram:

![Project](https://user-images.githubusercontent.com/44868546/66625784-93e90380-ebaa-11e9-9733-1dae0b8a44a2.jpg)

# Tech stack : 

* Frontend: React/Redux, React Native (Mobile app)
* Backend: Node.js
* Database: MongoDB (For unstructured data storage like RFID punches), MySQL (For all other data like user details, vendor details, Conference room and speaker details etc.)
* Hardware: RFID Reader, RFID Tags, Arduino
* Containerization and Cloud Deployment: Docker, AWS EC2

# Team Member Responsibilities:

* Akshit Ahuja - Data Modelling, Lead Generation APIs, LinkedIn API (Tentative- due to privacy policy)
* Ayushman Mittal - All backend APIs for the application
* Chaitanya Naik - All frontend related tasks for web application (for Organizers)
* Naman Agrawal - All frontend related tasks for mobile application (for Attendees), Push Notifications with speaker details

# Design Thinking
## Personas
1. Admin: Admin's responsibilities include:
  * Creating access credentials for event organizers
  * Providing RFID reader machines and RFID tags based on expected number of attendees and number of individual concurrent event rooms/stalls.
  * Provide/Sell generated leads to various vendors.

2. Event Organizer: Event Organizer will be responsible for:
  * Register attendee/vendor/speaker details.
  * Mapping RFID tags to attendees.
  * Mapping stalls and conference/event rooms to RFID readers.
  * Add event descriptions that will be visible to attendees.
 
3. Event Attendees: Event attendees will be able to view event/speaker details.

## Hill Statement
* At the end of every event, data will be processed and leads will be generated for every individual vendor.
* At the same time, a report will be generated for each speaker which will depict how well the speaker was able to resonate with the audience.
