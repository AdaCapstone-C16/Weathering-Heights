## Project Name
Weathering Heights


## Individual/Group
Group:
-Lia Gaetano
-Roslyn Melookaran
-Areeba Rashid


## Learning Goals
- Learn datascraping
- Learn to use a NoSQL database (Firebase)
- Learn web automation
- User authentication
- Working with APIs


## Project Description
Background- The Bulger list is comprised of the top 100 peaks in WA based on prominence. Many climbers in the PNW attempt to complete the list by summiting all 100 mountians. In many cases, this task can take many years or even decades.
 
Project (High-Level)- Climbers can get a weather overview of peaks from the list, sorted based on best weather conditions. Ultimately allowing climber to find peaks with best weather prospects for a given day.


## Project Type
Web Application

## Front-End Technology
- React

## Back-End Technologies

- Google Firebase
- BeautifulSoup (Static data scraped from https://www.peakbagger.com/list.aspx?lid=5003)
- MultiThreading
- Regular Expressions
- NWS and Open Weather API
- Google Calendar API
- User Authentication through firebase
- Folium

## Database
- Firebase

## Features
1.  Initialize database with peak info
    - Scrape data from peakbaggers: rank, name, elevation, link, coordinates, mtn range, indigenous name
2.  User logs in
    - Private routes only accessible when user is logged in.
    - Create a username and password
    - Login, store profile info 
3.  Pull weather data
    - NWS and Open Weather as weather API
4. Sort peaks by weather 
    - Sort peaks based on temperature/precip/wind
5.  Scrape tracks for a given peak and generate a combined map
6.  Create Google Calendar Event, invite a friend
7.  Mark complete the peaks you have summited, earn badges when all the peaks of a given range have been summited
