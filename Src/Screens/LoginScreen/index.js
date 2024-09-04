//import libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import CustomToastMessage from '../../Components/CustomToastMsg';


// create a component
const Login = ({ navigation }) => {
  const [Email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');



  const registeruser = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View>
          <Image
            source={require('../../../Assets/Images/login1.png')}
            resizeMode='contain'
            style={{ height: 250, width: 340, justifyContent: "center" }}
          />
        </View>
        <TextInput
          value={Email}
          onChangeText={txt => SetEmail(txt)}
          placeholder='Enter Email'
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={txt => SetPassword(txt)}
          placeholder='Enter Password'
          secureTextEntry={true}
          style={styles.input}
        />
        <CustomToastMessage
          visible={isVisible}
          isSuccess={isSuccess}
          message={message}
          onClose={() => setVisible(false)}
        />
        <TouchableOpacity
          style={styles.loginButton}
        // onPress={() => loginuser()}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 18, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => registeruser()}>
            <Text >{'Dont have account ? Resgister here '}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff"
  },
  input: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 22,
  },
  loginButton: {
    backgroundColor: '#36C2CE',
    alignItems: 'center',
    padding: 10,
    borderRadius: 22,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

//make this component available to the app
export default Login;
