import React, {
    useState,
    useEffect,
} from 'react';
import axios from 'axios';
import './EventsScreen.css';
import EventCard from '../EventCard/EventCard';

function EventsScreen() {
    const [tags, settags] = useState([]);
    const [selectedTags, setselectedTags] = useState([]);
    const [events, setevents] = useState([]);
    const [category, setcategory] = useState(0);
    const [subCategory, setsubCategory] = useState(0);


    function fetchTags() {
        const url = 'https://api.codingninjas.com/api/v3/event_tags';
        axios.get(url).then((response) => {
            settags(response.data.data.tags);
        })
    }

    function fetchEvents() {
        const categories = ['ALL_EVENTS', 'WEBINAR', 'CODING_EVENT', 'BOOTCAMP_EVENT', 'WORKSHOP'];
        const subCategories = ['Upcoming', 'Archived', 'All Time Favorites'];

        let requestedTags = '';
        for (let index = 0; index < selectedTags.length; index += 1) {
            requestedTags += tags[selectedTags[index]];
        }
        const url = `https://api.codingninjas.com/api/v3/events?event_category=${categories[category]}&event_sub_category=${subCategories[subCategory]}&tag_list=${requestedTags}&offset=0`;
        axios.get(url).then((response) => {
            setevents(response.data.data.events);
        })
    }

    function updateTags(tagIndex) {
        if (selectedTags.indexOf(tagIndex) !== -1) {
            const newTags = selectedTags.filter(prevTags => prevTags !== tagIndex)
            setselectedTags(newTags);
            // Save them in local storage
        } else {
            const newTags = [tagIndex, ...selectedTags]
            setselectedTags(newTags);
            // Save them in local storage
        }
    }

    useEffect(() => {
        fetchTags();
        fetchEvents();
    }, [category, subCategory, selectedTags])

    return (
        <div className='events-screen'>
            <div className='events-heading'>
                <div>
                    {'EVENTS & NEWS'}
                </div>
                <div>
                    {'Learn, Compete & Grow'}
                </div>

            </div>
            <div className='events-screen-container'>
                <div className='events-categories'>
                    {
                        ['All Events', 'Webinars', 'Coding Events', 'Bootcamp Events', 'Workshop'].map(
                            (category, index) => <div
                                key={index}
                                onClick={() => setcategory(index)}
                                style={{
                                    cursor:'pointer',
                                    color: 'grey',
                                }}
                            >{category}</div>
                        )
                    }
                </div>
                <div className='events-categories'>
                    {
                        ['Upcoming', 'Archived', 'All Time Favorites'].map(
                            (category, index) => <div
                                key={index}
                                onClick={() => setsubCategory(index)}
                                style={{
                                    cursor:'pointer',
                                    color: 'grey',
                                }}
                            >{category}</div>
                        )
                    }
                </div>
                <div className='events-and-tags'>
                    <div className='events-container'>
                        {
                            events.map((eventDetails, index) => <EventCard
                                key={index}
                                eventDetails={eventDetails}
                            />)
                        }
                    </div>
                    <div className='tags-container'>
                        <div className='tags-heading'>
                            TAGS
                        </div>
                        {
                            tags.map((tagValue, tagIndex) => <div
                                key={tagIndex}
                                onClick={() => updateTags(tagIndex)}
                                style={{
                                    background: 'lightgrey',
                                    margin: '5px',
                                    padding: '5px',
                                    borderRadius: '5px',
                                }}
                            >{tagValue}</div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsScreen
