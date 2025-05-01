require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const CUSTOM_OBJECT_TYPE = 'events';

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const hubspot = axios.create({
  baseURL: 'https://api.hubapi.com/crm/v3/',
  headers: {
    'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Routes
app.get('/', async (req, res) => {
  try {
    const response = await hubspot.get(
      `objects/${CUSTOM_OBJECT_TYPE}?properties=event_name,event_description,event_start_date,event_end_date,event_record_type`
    );
    const events = response.data.results;
    res.render('homepage', { 
      title: 'Event Management | HubSpot Integration',
      events 
    });
  } catch (error) {
    console.error('Error fetching events:', {
      message: error.message,
      response: error.response?.data
    });
    res.status(500).send('Error fetching events');
  }
});

app.get('/update-event', (req, res) => {
  res.render('update', { 
    title: 'Add New Event | HubSpot Integration' 
  });
});

app.post('/update-event', async (req, res) => {
  try {
    const eventData = {
      properties: {
        event_name: req.body.event_name,
        event_description: req.body.event_description,
        event_start_date: new Date(req.body.event_start_date).toISOString(),
        event_end_date: new Date(req.body.event_end_date).toISOString(),
        event_record_type: req.body.event_record_type
      }
    };
    
    await hubspot.post(`objects/${CUSTOM_OBJECT_TYPE}`, eventData);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating event:', error.response?.data || error.message);
    res.status(500).send('Error creating event');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});