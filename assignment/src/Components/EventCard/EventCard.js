import React from 'react';
import './EventCard.css';

function EventCard(props) {
    const { eventDetails } = props;
    return (
        <div className='card-container'>
            <div className='card'>
                <div className='card-upper-section'>
                    <img
                        src={eventDetails.mobile_cover_picture}
                        alt='cover'
                        width='100%'
                        style={{ borderRadius: '10px 10px 0px 0px' }}
                    />
                    <div className='event-name'>
                        <div>{eventDetails.name}</div>
                    </div>
                    <div className='event-details'>
                        <div>
                            <div>Starts Time:</div>
                            <div>{eventDetails.event_start_time}</div>
                        </div>
                        <div>
                            <div>Entry fee:</div>
                            <div>{eventDetails.fees === 0 ? 'Free' : eventDetails.fees}</div>
                        </div>
                        <div>
                            <div>Venue:</div>
                            <div>{eventDetails.venue}</div>
                        </div>
                    </div>
                    <div>
                        {eventDetails.short_desc}
                    </div>
                </div>
                <div className='card-lower-section'>
                    <div className='card-lower-left'>
                        {
                            eventDetails.registered_users.show_users_count && <div>
                                <div className='card-people'>
                                    {
                                        eventDetails.registered_users.top_users.map((user, index) => <div>
                                            <img
                                                key={index}
                                                src={user.image_url}
                                                alt='user'
                                                width='25px'
                                                style={{
                                                    borderRadius: '50%',
                                                    marginRight: '2px',
                                                }}
                                            />
                                        </div>)
                                    }
                                </div>
                                <div>
                                    and {eventDetails.registered_users.other_users_count} others
                                </div>

                            </div>
                        }

                    </div>
                    {
                        eventDetails.registration_status !== 'PAST' && <div className='card-lower-right'>
                            <div className='event-button'>Register</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default EventCard;
