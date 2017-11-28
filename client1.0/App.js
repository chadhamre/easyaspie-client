import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

import RestaurantModal from './components/modal'


export default class App extends React.Component {
  render() {
    return (
        <RestaurantModal/>
    );
  }
}

const styles = StyleSheet.create({

});
