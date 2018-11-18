import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Log extends Component {
    constructor() {
        super();
        this.state = {
            location: '',
            sessionDate: '',
            sessionType: '',
            coach: '',
            otherParticipants: '',
            sessionFocus: '',
            positiveTakeAways: '',
            areasOfOpportunity: '',
            errors: {}
        };
    }
    render() {
        const { errors } = this.state;

        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="location">Session Location</label>
                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                id="location"
                                placeholder="Session Location" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date">Session Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                id="date"
                                placeholder="Date" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="sessionType">Session Type</label>
                            <input
                                type="text"
                                name="sessionType"
                                className="form-control"
                                id="sessionType"
                                placeholder="Session Type" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date">Coach</label>
                            <input
                                type="text"
                                name="coach"
                                className="form-control"
                                id="coach"
                                placeholder="Coach" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="participants">Other Participants</label>
                        <input type="text" className="form-control" id="participants" placeholder="Doubles Partner" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sessionFocus">Session Focus</label>
                        <textarea className="form-control" id="sessionFocus" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="positiveTakeAways">Positive Take Aways</label>
                        <textarea className="form-control" id="positiveTakeAways" rows="6"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="areasOfOpportunity">Areas of Opportunity</label>
                        <textarea className="form-control" id="areasOfOpportunity" rows="6"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Log</button>
                </form>
            </div>
        );
    }

}

export default Log;