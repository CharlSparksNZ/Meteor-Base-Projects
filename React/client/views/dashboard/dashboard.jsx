const {
  ListItem,
  List,
  Avatar
} = mui

Dashboard = React.createClass({
  propTypes: {
    selectedPlayerId: React.PropTypes.string,
    onPlayerSelected: React.PropTypes.func
  },

  render() {
    let player = {
      _id: '123456',
      name: 'Charl Sparks',
      score: 10
    }

    return <List>
      <ListItem key={ player._id } secondaryText={ "Current score: " + player.score }>
        { player.name }
      </ListItem>
    </List>
  }
});
