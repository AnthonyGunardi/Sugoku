import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function EndGame({ route }) {
    const { isWin } = route.params;

    return (
        <View style={styles.container}>
          <View>
            {
              (isWin === 'unsolved') ?
                <Text style={{ color: 'white', fontSize: 45 }}>YOU LOOSE</Text>
                 :
                <Text style={{ color: 'white', fontSize: 45 }}>YOU WIN!</Text>
            }
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E73D5',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  }
});