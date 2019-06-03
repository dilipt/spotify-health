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

  addParticipant(request) {
    const id = Math.random().toString(36).slice(2);
    const participant = new Participant({ id, name: request.name });

    this.participants.push(participant);
    return participant;
  }
}

module.exports = {
  HealthCheck,
  Participant,
};
