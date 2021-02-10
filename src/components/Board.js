import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Board(props) {
  const [board, setBoard] = useState([])
  const [solution, setSolution] = useState([])
  const [screen, setScreen] = useState([])
  const [loading, setLoading] = useState(false)
  const playerName = props.playerName
  const difficulty = props.difficulty

  const fetchData = () => {
    setLoading(true)
    axios
      .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(({ data }) => {
        let newData = data.board
        fetchSolution(newData) 
        setBoard(newData)
        setScreen(board)
      })
      .catch(({ response }) => {
        console.log(response)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const encodeBoard = (board) =>
    board.reduce((result, row, i) =>
      result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

  const fetchSolution = (payload) => {
    setLoading(true)
    axios
      .post(`https://sugoku.herokuapp.com/solve`, encodeParams({ board: payload }))
      .then(({ data }) => {
        setSolution(data.solution)
      })
      .catch(({ response }) => {
        console.log(response)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const validateAnswer = (payload) => {
    setLoading(true)
    axios
      .post(`https://sugoku.herokuapp.com/validate`, encodeParams({ board: payload }))
      .then(({ data }) => {
        if (data.status === 'solved') {
          props.navigation.navigate('EndGame', { 
            isWin: 'solved'
          })
        } else {
            props.navigation.navigate('EndGame', {
              isWin: 'unsolved'
            })
          }
      })
      .catch(({ response }) => {
        console.log(response)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleOnChangeText = (input, i, j) => {
    screen[i][j] = Number(input)
    setScreen(screen)
  }

  const inputSetting = (num, i, j) => {
    if (num) {
      return (
        <Text style={styles.numSetting}>
          {num}
        </Text>
      )
    } else {
        return (
          <TextInput
            style={styles.numSetting}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={input => handleOnChangeText(input, i, j)}>
          </TextInput>
        )
      }
    }

  const startHandler = () => {
    setScreen(board)
  }

  useEffect(() => {
    fetchData()
    setScreen(board)
  }, [])


  return (
    <View style={styles.container}>
        {
          (loading) ?
            <View>
              <Text style={styles.loadingSetting}>Now Loading...</Text>
            </View>
            :
            <View>
              <View style={styles.boardSetting}>
                {
                  screen.map((row, i) =>
                    <View key={i}>
                      {
                        row.map((num, j) =>
                          <View key={j} >
                            {inputSetting(num, i, j)}
                          </View>
                        )
                       }
                    </View>)
                }
              </View>
                <View style={{ justifyContent: 'space-evenly' }}>
                  <Text style={{ textAlign: 'center', fontSize: 40, color: '#ffffff' }}>{playerName}</Text>
                  <Text></Text>
                  <Text style={{ textAlign: 'center', fontSize: 20, color: '#ffffff' }}>Difficulty: {difficulty}</Text>
                  <Text></Text>
                  <View style={styles.standaloneRow}>
                    <Button
                      onPress={() => { startHandler() }}
                      title="Start"
                      color="#888888" />
                    <Button
                      onPress={() => { validateAnswer(screen) }}
                      title="Submit"
                      color="#333333" />
                    <Button
                      onPress={() => { setScreen(solution) }}
                      title="Solution"
                      color="#222222" />
                  </View>
                </View>
            </View>
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203354'
  },
  boardSetting: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numSetting: {
    color: '#fff',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    fontSize: 20,
    width: 40,
    height: 40
  },
  loadingSetting: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 15
  },
  standaloneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
