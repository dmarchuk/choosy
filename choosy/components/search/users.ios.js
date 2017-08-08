import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

let styles = StyleSheet.create({
    // TODO: These styles should eventually end up in a separate component, viz. L:72 of this file
    image: {borderRadius: 0, width: 40, height: 40, marginHorizontal: 3, marginVertical: 3},
    infoContainer: {flexDirection: 'row', height: 46, alignSelf: 'stretch'},
    usernameContainer: {justifyContent: 'center', flexDirection: 'column'},
    location: {fontSize: 10},

    // Slider pagination
    pagination: {bottom: 5}
});

class UsersSearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = 'https://randomuser.me/api/?results=20';
    this.setState({ loading: true });

    // Fetching example data from 'https://randomuser.me/api/?results=20' and adding it to state
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    return (
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
              // TODO: Make a separate component
              <View style={styles.infoContainer}>
                <Image source={{uri: item.picture.thumbnail}}
                       style={styles.image}
                />
                <View style={styles.usernameContainer}>
                  <Text> {item.login.username} </Text>
                  <Text style={styles.location}> {item.location.city} </Text>
                </View>
              </View>

          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          contentInset={{bottom: 50, top: 0}}
        />
    );
  }
}

export default UsersSearchList;