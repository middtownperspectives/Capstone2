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
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="location">Session Location</label>
                            <input
                                type="text"
                                name="location"
                                class="form-control"
                                id="location"
                                placeholder="Session Location" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="date">Session Date</label>
                            <input
                                type="date"
                                name="date"
                                class="form-control"
                                id="date"
                                placeholder="Date" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="sessionType">Session Type</label>
                            <input
                                type="text"
                                name="sessionType"
                                class="form-control"
                                id="sessionType"
                                placeholder="Session Type" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="date">Coach</label>
                            <input
                                type="text"
                                name="coach"
                                class="form-control"
                                id="coach"
                                placeholder="Coach" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="participants">Other Participants</label>
                        <input type="text" class="form-control" id="participants" placeholder="Doubles Partner" />
                    </div>
                    <div class="form-group">
                        <label for="sessionFocus">Session Focus</label>
                        <textarea class="form-control" id="sessionFocus" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="positiveTakeAways">Positive Take Aways</label>
                        <textarea class="form-control" id="positiveTakeAways" rows="6"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="areasOfOpportunity">Areas of Opportunity</label>
                        <textarea class="form-control" id="areasOfOpportunity" rows="6"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Log</button>
                </form>
            </div>
        );
    }

}

export default Log;