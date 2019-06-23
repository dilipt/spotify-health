const uuid = require('uuid/v1');

class Participant {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.passkey = uuid();
  }
}


class HealthCheck {
  constructor({ id, name, indicators }) {
    this.id = id;
    this.name = name;
    this.participants = [];
    this.startDate = new Date().getTime();
    this.indicators = indicators.map(indicator => ({
      ...indicator,
      scores: [],
      trends: [],
    }));
  }

  addParticipant({ username, browserKey }) {
    const participant = new Participant({
      id: browserKey,
      name: username,
    });

    this.participants.push(participant);
    return participant;
  }
}

module.exports = {
  HealthCheck,
  Participant,
};
