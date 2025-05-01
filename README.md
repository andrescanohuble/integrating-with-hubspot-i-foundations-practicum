# HubSpot Event Management Integration

This application demonstrates integration with HubSpot CRM to manage custom Event objects.

## Setup

1. Clone this repository
2. Run `npm install`
3. Create a `.env` file with your HubSpot credentials:

HUBSPOT_ACCESS_TOKEN=your_private_app_token
PORT=3000

## HubSpot Setup
1. Create a private app with:
   - `crm.objects.custom` (read/write)
   - `crm.schemas.custom` (read/write)
2. Create custom object "events" with properties:
   - event_name (text)
   - event_description (text)
   - event_start_date (date)
   - event_end_date (date)
   - event_record_type (dropdown)

4. Run `npm start` or `npm run dev` for development with nodemon

## Custom Object

View Events in HubSpot: [Event List View](https://app.hubspot.com/contacts/49503386/objects/2-43178137/views/all/list)

## Features

- View all events in a table
- Add new events via a form
- Simple responsive design
