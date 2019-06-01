class Participant {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
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

  addParticipant(participant) {
    const match = this.participants.filter(p => p.id === participant.id);
    const exists = match.length > 0;
    if (exists) {
      match[0] = participant;
    } else {
      this.participants.push(participant);
    }
  }
}

module.exports = {
  HealthCheck,
  Participant,
};
